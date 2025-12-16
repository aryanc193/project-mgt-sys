from django.test import TestCase
from graphene.test import Client
from core.schema import schema
from core.models import Organization, Project


class GraphQLProjectTest(TestCase):
    def test_projects_scoped_to_organization(self):
        org1 = Organization.objects.create(
            name="Org One", slug="org-one", contact_email="a@test.com"
        )
        org2 = Organization.objects.create(
            name="Org Two", slug="org-two", contact_email="b@test.com"
        )

        Project.objects.create(
            organization=org1,
            name="Project A",
            status="ACTIVE"
        )
        Project.objects.create(
            organization=org2,
            name="Project B",
            status="ACTIVE"
        )

        client = Client(schema)

        query = """
        query ($orgId: ID!) {
          projects(organizationId: $orgId) {
            name
          }
        }
        """

        result = client.execute(query, variables={"orgId": org1.id})

        project_names = [p["name"] for p in result["data"]["projects"]]

        self.assertIn("Project A", project_names)
        self.assertNotIn("Project B", project_names)
