import factory
from django.contrib.auth.models import User


class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Sequence(lambda next_number: f"magic_user_{next_number}")
    password = "notvalid"

    class Meta:
        model = User
