import factory
from apps.budget.models import Budget


class BudgetFactory(factory.django.DjangoModelFactory):

    @factory.post_generation
    def shared_with(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for user in extracted:
                self.shared_with.add(user)

    class Meta:
        model = Budget
