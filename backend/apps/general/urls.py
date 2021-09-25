from django.urls import path, include
from apps.general.views import Logout

urlpatterns = [
    path('logout/', Logout.as_view()),
]
