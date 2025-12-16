import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError

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
    task_comments = graphene.List(
        TaskCommentType,
        task_id=graphene.ID(required=True)
    )

    def resolve_organizations(self, info):
        return Organization.objects.all()

    def resolve_projects(self, info, organization_id):
        return Project.objects.filter(organization_id=organization_id)

    def resolve_tasks(self, info, project_id):
        return Task.objects.filter(project_id=project_id)

    def resolve_task_comments(self, info, task_id):
        return TaskComment.objects.filter(task_id=task_id)

class CreateProject(graphene.Mutation):
    class Arguments:
        organization_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.Date()

    project = graphene.Field(ProjectType)

    def mutate(self, info, organization_id, name, description=None, status=None, due_date=None):
        organization = Organization.objects.filter(id=organization_id).first()
        if not organization:
            raise GraphQLError("Organization not found")

        project = Project.objects.create(
            organization=organization,
            name=name,
            description=description or "",
            status=status or "ACTIVE",
            due_date=due_date,
        )
        return CreateProject(project=project)


class UpdateProjectStatus(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        status = graphene.String(required=True)

    project = graphene.Field(ProjectType)

    def mutate(self, info, project_id, status):
        project = Project.objects.filter(id=project_id).first()
        if not project:
            raise GraphQLError("Project not found")

        project.status = status
        project.save()

        return UpdateProjectStatus(project=project)

class CreateTask(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(self, info, project_id, title, description=None, status=None, assignee_email=None):
        project = Project.objects.filter(id=project_id).select_related("organization").first()
        if not project:
            raise GraphQLError("Project not found")

        task = Task.objects.create(
            project=project,
            title=title,
            description=description or "",
            status=status or "TODO",
            assignee_email=assignee_email or "",
        )
        return CreateTask(task=task)

class UpdateTaskStatus(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        status = graphene.String(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, task_id, status):
        task = Task.objects.filter(id=task_id).first()
        if not task:
            raise GraphQLError("Task not found")

        task.status = status
        task.save()

        return UpdateTaskStatus(task=task)

class AddTaskComment(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, task_id, content, author_email):
        task = Task.objects.filter(id=task_id).first()
        if not task:
            raise GraphQLError("Task not found")

        comment = TaskComment.objects.create(
            task=task,
            content=content,
            author_email=author_email,
        )
        return AddTaskComment(comment=comment)


class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project_status = UpdateProjectStatus.Field()
    create_task = CreateTask.Field()
    update_task_status = UpdateTaskStatus.Field()
    add_task_comment = AddTaskComment.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
