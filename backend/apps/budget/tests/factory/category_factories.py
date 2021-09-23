import factory
from apps.budget.models import Category


class CategoryFactory(factory.django.DjangoModelFactory):
    name = factory.Sequence(lambda next_number: f"category_{next_number}")

    class Meta:
        model = Category
