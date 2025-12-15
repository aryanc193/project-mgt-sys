import graphene
from graphene_django import DjangoObjectType

from .models import Organization, Project, Task, TaskComment


class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("id", "name", "slug", "contact_email")


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ("id", "name", "description", "status", "due_date")


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "status", "assignee_email")


class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = ("id", "content", "author_email", "created_at")

class Query(graphene.ObjectType):
    organizations = graphene.List(OrganizationType)
    projects = graphene.List(
        ProjectType,
        organization_id=graphene.ID(required=True)
    )
    tasks = graphene.List(
        TaskType,
        project_id=graphene.ID(required=True)
    )

    def resolve_organizations(self, info):
        return Organization.objects.all()

    def resolve_projects(self, info, organization_id):
        return Project.objects.filter(organization_id=organization_id)

    def resolve_tasks(self, info, project_id):
        return Task.objects.filter(project_id=project_id)

schema = graphene.Schema(query=Query)
