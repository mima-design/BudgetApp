from rest_framework import serializers
from django.contrib.auth.models import User
from apps.budget.models import Entry, Budget, Category


class EntrySerializer(serializers.ModelSerializer):
    category = Category()

    class Meta:
        model = Entry
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class BudgetSerializer(serializers.ModelSerializer):
    budget_entry = EntrySerializer(many=True, required=False)
    shared_with = serializers.PrimaryKeyRelatedField(many=True,
                                                     queryset=User.objects.all(),
                                                     required=False)

    class Meta:
        model = Budget
        fields = "__all__"
        extra_kwargs = {
            "owner": {"read_only": True},
        }

    def create(self, validated_data):
        return Budget.objects.create(owner=self.context["request"].user)
