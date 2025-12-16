import { gql } from "@apollo/client/core";

export const TASKS_QUERY = gql`
  query Tasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      status
      assigneeEmail
    }
  }
`;
