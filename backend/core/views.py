from rest_framework import viewsets
from .models import Organization, Project, Task
from .serializers import (
    OrganizationSerializer,
    ProjectSerializer,
    TaskSerializer,
)
from .services.notifications import send_task_notification
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .reports import task_status_summary


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        task = serializer.save()

        if task.assignee_email:
            send_task_notification(
                task.assignee_email,
                f"You were assigned a new task: {task.title}"
            )


@api_view(["GET"])
def project_task_report(request, project_id):
    data = task_status_summary(project_id)
    return Response(list(data))
