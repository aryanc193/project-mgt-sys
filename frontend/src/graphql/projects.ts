import { gql } from "@apollo/client/core";

export const PROJECTS_QUERY = gql`
  query Projects($organizationId: ID!) {
    projects(organizationId: $organizationId) {
      id
      name
      status
      dueDate
    }
  }
`;
