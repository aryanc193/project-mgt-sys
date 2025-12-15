import { gql } from "@apollo/client/core";

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject(
    $organizationId: ID!
    $name: String!
  ) {
    createProject(
      organizationId: $organizationId
      name: $name
    ) {
      project {
        id
        name
        status
        dueDate
      }
    }
  }
`;
