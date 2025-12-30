from rest_framework.routers import DefaultRouter
from .views import OrganizationViewSet, ProjectViewSet, TaskViewSet

router = DefaultRouter()
router.register("organizations", OrganizationViewSet)
router.register("projects", ProjectViewSet)
router.register("tasks", TaskViewSet)

urlpatterns = router.urls
