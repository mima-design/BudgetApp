import pytest
import json
from rest_framework.test import APIClient
from shared.tests.fixture.user_fixtures import create_apiclient_with_token, create_regular_user, create_regular_user_2


@pytest.mark.django_db
def test_login(regular_user):
    client = APIClient()
    resp = client.post("/auth/", json.dumps({"username": regular_user.username, "password": "notvalid"}),
                       content_type="application/json")
    assert resp.status_code == 200


@pytest.mark.django_db
def test_require_login(regular_user):
    client = APIClient()
    resp = client.get("/budget/")
    assert resp.status_code == 401


@pytest.mark.django_db
def test_logout(apiclient_with_token):
    resp = apiclient_with_token.get("/logout/")
    assert resp.status_code == 200
    assert resp.json()['logout']

    resp = apiclient_with_token.get("/logout/")
    assert resp.status_code == 401


@pytest.mark.django_db
def test_get_current_user(apiclient_with_token, regular_user):
    resp = apiclient_with_token.get("/user/current/")
    resp_json = resp.json()
    assert resp_json["username"] == regular_user.username


@pytest.mark.django_db
def test_get_users(apiclient_with_token, regular_user_2):
    resp = apiclient_with_token.get("/user/")
    resp_json = resp.json()
    assert len(resp_json["results"]) == 2
    assert resp_json["results"][1]["username"] == regular_user_2.username
