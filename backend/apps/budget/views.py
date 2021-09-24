from django.db.models import Q
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

    def get_queryset(self):
        request = self.request
        if self.detail: #this will make problems with pagination
            pk = self.kwargs["pk"]
            return Budget.objects.filter(pk=pk)

        if request.user.is_superuser:
            return super().get_queryset()

        budget_queryset = Budget.objects.filter(Q(owner_id=request.user.id) | Q(shared_with__id=request.user.id))

        return budget_queryset


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
