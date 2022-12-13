import { gql } from "@apollo/client";

export const GET_COMMENT_BY_ID = gql`
  query {
    usersPermissionsUsers {
      data {
        id
        attributes {
          username
        }
      }
    }
  }
`;
