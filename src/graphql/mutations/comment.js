import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      data {
        id
        attributes {
          username
          userEmail
          description
        }
      }
    }
  }
`;
