import { gql } from "@apollo/client/core";

export const COMMENTS_QUERY = gql`
  query Comments($taskId: ID!) {
    taskComments(taskId: $taskId) {
      id
      content
      authorEmail
      createdAt
    }
  }
`;
