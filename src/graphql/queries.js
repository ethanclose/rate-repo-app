import { gql } from '@apollo/client';
import { REPO_DETAILS } from './fragments';

export const ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query getRepositories {
    repositories {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepoDetails
    }
  }
  ${REPO_DETAILS}
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        createdAt
        id
        reviewCount
        username
      }
    }
  }
`;
