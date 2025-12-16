import { useState } from "react";
import { AppLayout } from "./layouts/AppLayout";
import { OrganizationSelector } from "./components/OrganizationSelector";
import { ProjectList } from "./components/ProjectList";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { TaskList } from "./components/TaskList";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskComments } from "./components/TaskComments";

function App() {
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="space-y-10">
        {/* Organization */}
        <section className="rounded-lg border bg-white p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Organization
          </label>
          <OrganizationSelector
            selectedOrgId={organizationId}
            onSelect={setOrganizationId}
          />
        </section>

        {/* Projects */}
        {organizationId && (
          <section className="rounded-lg border bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Projects</h2>
            </div>

            <CreateProjectForm organizationId={organizationId} />

            <ProjectList
              organizationId={organizationId}
              onSelectProject={setProjectId}
              selectedProjectId={projectId}
            />
          </section>
        )}

        {/* Tasks */}
        {projectId && (
          <section className="rounded-lg border bg-white p-6 space-y-4">
            <h3 className="text-md font-semibold">Tasks</h3>

            <CreateTaskForm projectId={projectId} />

            <TaskList projectId={projectId} onSelectTask={setTaskId} />
          </section>
        )}

        {/* Comments */}
        {taskId && (
          <section className="rounded-lg border bg-white p-6">
            <TaskComments taskId={taskId} />
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default App;
