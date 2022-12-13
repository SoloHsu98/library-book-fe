import { gql } from "@apollo/client";

export const GET_USERS = gql`
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
