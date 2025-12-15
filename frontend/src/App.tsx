import { useState } from "react";
import { AppLayout } from "./layouts/AppLayout";
import { OrganizationSelector } from "./components/OrganizationSelector";
import { ProjectList } from "./components/ProjectList";

function App() {
  const [organizationId, setOrganizationId] = useState<string | null>(null);

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
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Projects</h2>
              <ProjectList organizationId={organizationId} />
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
