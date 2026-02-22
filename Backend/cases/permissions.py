from rest_framework.permissions import BasePermission

class IsAdminOrOfficer(BasePermission):
    """
    Allow access only to users with role 'admin' or 'officer'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['admin', 'officer']


class IsInvestigatorOrReadOnly(BasePermission):
    """
    Investigators can only read data, admins/officers can modify.
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.role in ['admin', 'officer']:
            return True
        if request.user.role == 'guest':  # or 'investigator' if you add that role
            return request.method in ['GET', 'HEAD', 'OPTIONS']
        return False