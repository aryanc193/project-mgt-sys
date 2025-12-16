import { gql } from "@apollo/client/core";

export const ADD_COMMENT_MUTATION = gql`
  mutation AddTaskComment(
    $taskId: ID!
    $content: String!
    $authorEmail: String!
  ) {
    addTaskComment(
      taskId: $taskId
      content: $content
      authorEmail: $authorEmail
    ) {
      comment {
        id
        content
        authorEmail
        createdAt
      }
    }
  }
`;
