import pytest
from apps.budget.tests.factory.budget_factories import BudgetFactory
from shared.tests.fixture.user_fixtures import create_regular_user, create_regular_user_2
from apps.budget.tests.fixture.category_fixtures import create_single_category


@pytest.fixture(name="single_budget_not_shared")
def create_single_budget_not_shared(regular_user, single_category):
    return BudgetFactory.create(owner=regular_user, category=single_category)


@pytest.fixture(name="single_budget_shared")
def create_single_budget_shared(regular_user, regular_user_2, single_category):
    return BudgetFactory.create(owner=regular_user, category=single_category, shared_with=[regular_user_2])
