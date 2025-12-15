import { useQuery } from "@apollo/client/react";
import type { FC } from "react";
import { PROJECTS_QUERY } from "../graphql/projects";

type Project = {
  id: string;
  name: string;
  status: string;
  dueDate?: string | null;
};

type Props = {
  organizationId: string;
};

export const ProjectList: FC<Props> = ({ organizationId }) => {
  const { data, loading, error } = useQuery<{
    projects: Project[];
  }>(PROJECTS_QUERY, {
    variables: { organizationId },
  });

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects</div>;

  if (data!.projects.length === 0) {
    return <div className="text-gray-500">No projects yet.</div>;
  }

  return (
    <div className="space-y-3">
      {data!.projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between rounded border bg-white p-4"
        >
          <div>
            <div className="font-medium">{project.name}</div>
            <div className="text-sm text-gray-500">
              Status: {project.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
