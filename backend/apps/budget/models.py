from django.db import models
from django.contrib.auth.models import User


class Entry(models.Model):
    EXPENSES = 0
    INCOME = 1
    CHOICES = (
        (EXPENSES, "Expenses"),
        (INCOME, "Income")
    )

    type = models.IntegerField(choices=CHOICES)
    quantity = models.DecimalField("Quantity", decimal_places=2, max_digits=16)
    budget = models.ForeignKey("Budget", on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=128)


class Budget(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="budget_owner")
    shared_with = models.ManyToManyField(User, blank=True, related_name="shared_budgets")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)




