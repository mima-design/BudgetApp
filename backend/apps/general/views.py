from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken


class Logout(ObtainAuthToken):

    def get(self, request):
        request.user.auth_token.delete()
        return JsonResponse({"logout": True}, safe=False)
