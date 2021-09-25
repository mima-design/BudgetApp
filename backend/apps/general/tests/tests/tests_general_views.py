import pytest
from shared.tests.fixture.user_fixtures import create_apiclient_with_token, create_regular_user


@pytest.mark.django_db
def test_logout(apiclient_with_token):
    resp = apiclient_with_token.get("/logout/")
    assert resp.status_code == 200
    assert resp.json()['logout']

    resp = apiclient_with_token.get("/logout/")
    assert resp.status_code == 401
