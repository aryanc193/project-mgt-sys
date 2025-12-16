import { useState } from "react";
import { AppLayout } from "./layouts/AppLayout";
import { OrganizationSelector } from "./components/OrganizationSelector";
import { ProjectList } from "./components/ProjectList";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { TaskList } from "./components/TaskList";

function App() {
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization
          </label>
          <OrganizationSelector
            selectedOrgId={organizationId}
            onSelect={setOrganizationId}
          />
          {organizationId && (
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-semibold">Projects</h2>
              <CreateProjectForm organizationId={organizationId} />
              <ProjectList
                organizationId={organizationId}
                onSelectProject={setProjectId}
              />
            </div>
          )}
          {projectId && (
            <div className="mt-8">
              <h3 className="mb-3 text-md font-semibold">Tasks</h3>
              <TaskList projectId={projectId} />
            </div>
          )}
        </div>

        {organizationId && (
          <div className="rounded border bg-white p-4 text-sm text-gray-600">
            Selected organization ID: {organizationId}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default App;
