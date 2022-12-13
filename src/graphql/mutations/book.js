import { gql } from "@apollo/client";

export const UNSAVE_BOOK = gql`
  mutation updateBook($id: ID!, $data: BookInput!) {
    updateBook(id: $id, data: $data) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;
