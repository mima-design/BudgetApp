from rest_framework import routers
from apps.budget.views import EntryViewSet, BudgetViewSet, CategoryViewSet

router = routers.SimpleRouter()
router.register("entry", EntryViewSet)
router.register("budget", BudgetViewSet)
router.register("category", CategoryViewSet)

urlpatterns = router.urls
