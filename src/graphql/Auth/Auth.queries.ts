import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation SignUp($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;

export const SIGNIN = gql`
  query SignIn($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;
