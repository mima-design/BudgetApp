from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from apps.budget.models import Budget, Entry, Category
from apps.budget.serializers import BudgetSerializer, EntrySerializer, CategorySerializer
from apps.budget.permissions import BudgetIsOwnerOrShared


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated, BudgetIsOwnerOrShared]
    authentication_classes = (TokenAuthentication,)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
