from django.urls import path
from rest_framework import routers
from apps.general.views import Logout, UserView


router = routers.SimpleRouter()
router.register("user", UserView)

urlpatterns = [
    path('logout/', Logout.as_view()),
] + router.urls
