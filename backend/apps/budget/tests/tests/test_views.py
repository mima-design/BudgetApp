import pytest
import json
from django.test import Client
from apps.budget.tests.fixture.category_fixtures import create_single_category
from apps.budget.tests.fixture.budget_fixtures import create_single_budget_not_shared, create_single_budget_shared
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
    assert len(response_json) == 1
    assert response_json[0]["id"] == single_category.id


@pytest.mark.parametrize(
    "client,expected_content,expected_status,budget_fixture",
    [
        (pytest.lazy_fixture("apiclient_with_token"),
         b'{"id":1,"budget_entry":[],"owner":1,"category":1,"shared_with":[]}',
         200,
         pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"),
         b'{"detail":"Missing permission to access object"}',
         403,
         pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"),
         b'{"id":1,"budget_entry":[],"owner":2,"category":1,"shared_with":[1]}',
         200, pytest.lazy_fixture("single_budget_shared")),
    ]
)
@pytest.mark.django_db
def test_get_bugdet_endpoint(client, expected_content, expected_status, budget_fixture):
    resp = client.get("/budget/1/")
    assert resp.status_code == expected_status
    assert resp.content == expected_content


@pytest.mark.parametrize(
    "client,expected_status,budget_fixture",
    [
        (pytest.lazy_fixture("apiclient_with_token"), 204, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"), 403, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("apiclient_2_with_token"), 403, pytest.lazy_fixture("single_budget_shared")),
    ]
)
@pytest.mark.django_db
def test_delete_bugdet_endpoint(client, expected_status, budget_fixture):
    resp = client.delete("/budget/1/")
    assert resp.status_code == expected_status
