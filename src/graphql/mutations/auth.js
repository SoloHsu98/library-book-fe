import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $password: String!, $email: String!) {
    register(
      input: { username: $username, password: $password, email: $email }
    ) {
      jwt
      user {
        id
        username
      }
    }
  }
`;
