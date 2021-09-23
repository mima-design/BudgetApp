import pytest
from django.test import Client
from apps.budget.tests.fixture.category_fixtures import create_single_category
from apps.budget.tests.fixture.budget_fixtures import create_single_budget_not_shared, create_single_budget_shared
from shared.tests.fixture.user_fixtures import create_regular_user, create_regular_user_2


@pytest.mark.django_db
def test_create_category(regular_user):
    client = Client()
    client.force_login(user=regular_user)
    resp = client.post("/category/", {"name": "asdf"}, content_type="application/json")
    assert resp.status_code == 201


@pytest.mark.django_db
def test_get_category(single_category, regular_user):
    client = Client()
    client.force_login(user=regular_user)
    resp = client.get("/category/")
    response_json = resp.json()
    assert resp.status_code == 200
    assert len(response_json) == 1
    assert response_json[0]["id"] == single_category.id


@pytest.mark.parametrize(
    "user,expected_content,expected_status,budget_fixture",
    [
        (pytest.lazy_fixture("regular_user"), b'{"id":1,"budget_entry":[],"owner":1,"category":1,"shared_with":[]}',
         200, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("regular_user_2"), b'{"detail":"Missing permission to access object"}', 403,
         pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("regular_user_2"), b'{"id":1,"budget_entry":[],"owner":2,"category":1,"shared_with":[1]}',
         200, pytest.lazy_fixture("single_budget_shared")),
    ]
)
@pytest.mark.django_db
def test_get_bugdet_endpoint(user, expected_content, expected_status, budget_fixture):
    client = Client()
    client.force_login(user=user)
    resp = client.get("/budget/1/")
    assert resp.status_code == expected_status
    assert resp.content == expected_content


@pytest.mark.parametrize(
    "user,expected_status,budget_fixture",
    [
        (pytest.lazy_fixture("regular_user"), 204, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("regular_user_2"), 403, pytest.lazy_fixture("single_budget_not_shared")),
        (pytest.lazy_fixture("regular_user_2"), 403, pytest.lazy_fixture("single_budget_shared")),
    ]
)
@pytest.mark.django_db
def test_delete_bugdet_endpoint(user, expected_status, budget_fixture):
    client = Client()
    client.force_login(user=user)
    resp = client.delete("/budget/1/")
    assert resp.status_code == expected_status
