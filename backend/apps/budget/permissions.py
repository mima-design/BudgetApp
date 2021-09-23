from rest_framework import permissions

EDITABLE_METHODS = ["POST", "PUT", "DELETE"]


class BudgetIsOwnerOrShared(permissions.BasePermission):
    message = "Missing permission to access object"

    def has_object_permission(self, request, view, obj):
        is_owner = request.user == obj.owner
        is_shared = obj.shared_with.filter(pk=request.user.id).exists()
        is_superuser = request.user.is_superuser

        if request.method in EDITABLE_METHODS:
            return is_owner or is_superuser
        return is_owner or is_shared or is_superuser
