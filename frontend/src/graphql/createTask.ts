import { gql } from "@apollo/client/core";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $projectId: ID!
    $title: String!
  ) {
    createTask(
      projectId: $projectId
      title: $title
    ) {
      task {
        id
        title
        status
        assigneeEmail
      }
    }
  }
`;
