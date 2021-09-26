import pytest
import json
from apps.budget.models import Budget
from django.test import Client
from apps.budget.tests.fixture.category_fixtures import create_single_category
from apps.budget.tests.fixture.budget_fixtures import \
    create_single_budget_not_shared, create_single_budget_shared, create_plenty_budget_not_shared
from shared.tests.fixture.user_fixtures import \
    create_regular_user, create_regular_user_2, create_apiclient_with_token, create_apiclient_2_with_token


@pytest.mark.django_db
def test_create_category(apiclient_with_token):
    resp = apiclient_with_token.post("/category/", json.dumps({"name": "asdf"}), content_type="application/json")
    assert resp.status_code == 201


@pytest.mark.django_db
def test_get_category(single_category, apiclient_with_token):
    resp = apiclient_with_token.get("/category/")
    response_json = resp.json()
    assert resp.status_code == 200
    assert len(response_json["results"]) == 1
    assert response_json["results"][0]["id"] == single_category.id


@pytest.mark.parametrize(
    "client,expected_content,expected_status,budget_fixture",
    [
        (pytest.lazy_fixture("apiclient_with_token"),
         b'{"id":1,"budget_entry":[],"shared_with":[],"owner":1}',
         200,
         pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"),
         b'{"detail":"Missing permission to access object"}',
         403,
         pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"),
         b'{"id":1,"budget_entry":[],"shared_with":[1],"owner":2}',
         200, pytest.lazy_fixture("single_budget_shared")),
    ]
)
@pytest.mark.django_db
def test_get_bugdet_endpoint(client, expected_content, expected_status, budget_fixture):
    resp = client.get("/budget/1/")
    assert resp.status_code == expected_status
    assert resp.content == expected_content


@pytest.mark.django_db
def test_get_all_bugdets(apiclient_with_token, plenty_budget_not_shared):
    resp = apiclient_with_token.get("/budget/?page=2")
    resp_json = resp.json()
    assert resp.status_code == 200
    assert resp_json["count"] == 30
    assert len(resp_json["results"]) == 5


@pytest.mark.parametrize(
    "client,expected_status,budget_fixture",
    [
        (pytest.lazy_fixture("apiclient_with_token"), 204, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"), 403, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"), 403, pytest.lazy_fixture("single_budget_shared")),
    ]
)
@pytest.mark.django_db
def test_delete_budget_endpoint(client, expected_status, budget_fixture):
    resp = client.delete("/budget/1/")
    assert resp.status_code == expected_status


@pytest.mark.django_db
def test_post_budget_endpoint(apiclient_with_token):
    resp = apiclient_with_token.post("/budget/", {}, content_type="application/json")
    assert resp.status_code == 201
    resp_json = resp.json()

    budget = Budget.objects.get(id=resp_json["id"])
    assert budget.owner_id == resp_json["owner"]


@pytest.mark.django_db
def test_put_budget_share_with_user(apiclient_with_token, single_budget_not_shared, regular_user_2):
    resp = apiclient_with_token.put(f"/budget/{single_budget_not_shared.id}/",
                                    json.dumps({"shared_with": [regular_user_2.id]}),
                                    content_type="application/json")
    resp_json = resp.json()
    assert resp.status_code == 200
    budget = Budget.objects.get(id=single_budget_not_shared.id)
    assert list(budget.shared_with.all().values_list("id", flat=True)) == [regular_user_2.id]

