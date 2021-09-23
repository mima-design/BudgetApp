from rest_framework import serializers
from apps.budget.models import Entry, Budget, Category


class EntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class BudgetSerializer(serializers.ModelSerializer):
    entry = EntrySerializer(many=True)
    category = Category()

    class Meta:
        model = Budget
        fields = "__all__"
        extra_kwargs = {
            "entry": {"required": False},
            "category": {"required": False}
        }
