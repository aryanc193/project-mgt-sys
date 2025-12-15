import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";

const TEST_QUERY = gql`
  query {
    organizations {
      id
      name
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(TEST_QUERY);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error)
    return <div className="p-6 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Organizations</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default App;
