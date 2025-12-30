from django.db.models import Count
from .models import Task

def task_status_summary(project_id):
    return (
        Task.objects
        .filter(project_id=project_id)
        .values("status")
        .annotate(count=Count("id"))
    )
