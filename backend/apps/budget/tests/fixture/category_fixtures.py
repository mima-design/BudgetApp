import pytest
from apps.budget.tests.factory.category_factories import CategoryFactory


@pytest.fixture(name="single_category")
def create_single_category():
    return CategoryFactory.create()
