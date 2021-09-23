import pytest
from django.test import Client
from apps.budget.tests.fixture.category_fixtures import create_single_category


@pytest.mark.django_db
def test_create_category():
    client = Client()
    resp = client.post("/category/", {"name": "asdf"}, content_type="application/json")
    assert resp.status_code == 201


@pytest.mark.django_db
def test_get_category(single_category):
    client = Client()
    resp = client.get("/category/")
    response_json = resp.json()
    assert resp.status_code == 200
    assert len(response_json) == 1
    assert response_json[0]["id"] == single_category.id
