import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";

const ORGANIZATIONS_QUERY = gql`
  query {
    organizations {
      id
      name
    }
  }
`;

type Organization = {
  id: string;
  name: string;
};

type OrganizationsQueryResult = {
  organizations: Organization[];
};

type Props = {
  selectedOrgId: string | null;
  onSelect: (id: string) => void;
};

export function OrganizationSelector({ selectedOrgId, onSelect }: Props) {
  const { data, loading, error } =
    useQuery<OrganizationsQueryResult>(ORGANIZATIONS_QUERY);

  if (loading) return <div>Loading organizations...</div>;
  if (error) return <div>Error loading organizations</div>;

  return (
    <select
      className="border rounded px-3 py-2 cursor-pointer"
      value={selectedOrgId ?? ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="" disabled>
        Select organization
      </option>
      {data!.organizations.map((org) => (
        <option key={org.id} value={org.id}>
          {org.name}
        </option>
      ))}
    </select>
  );
}
