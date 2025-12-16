import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT_MUTATION } from "../graphql/createProject";
import { PROJECTS_QUERY } from "../graphql/projects";

// TYPES (MUST BE ABOVE)

type Project = {
  id: string;
  name: string;
  status: string;
  dueDate?: string | null;
};

type CreateProjectResult = {
  createProject: {
    project: Project;
  };
};

type ProjectsQueryResult = {
  projects: Project[];
};

type Props = {
  organizationId: string;
};

// COMPONENT

export function CreateProjectForm({ organizationId }: Props) {
  const [name, setName] = useState("");

  const [createProject, { loading }] = useMutation<CreateProjectResult>(
    CREATE_PROJECT_MUTATION,
    {
      update(cache, { data }) {
        if (!data?.createProject?.project) return;

        const newProject = data.createProject.project;

        const existing = cache.readQuery<ProjectsQueryResult>({
          query: PROJECTS_QUERY,
          variables: { organizationId },
        });

        if (!existing) return;

        cache.writeQuery({
          query: PROJECTS_QUERY,
          variables: { organizationId },
          data: {
            projects: [...existing.projects, newProject],
          },
        });
      },
    }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    createProject({
      variables: {
        organizationId,
        name,
      },
    });

    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded border px-3 py-2"
        placeholder="New project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}
