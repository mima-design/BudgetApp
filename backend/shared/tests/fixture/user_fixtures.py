import pytest
from shared.tests.factory.user_factory import UserFactory


@pytest.fixture(name="regular_user")
def create_regular_user():
    return UserFactory.create()


@pytest.fixture(name="regular_user_2")
def create_regular_user_2():
    return UserFactory.create()
