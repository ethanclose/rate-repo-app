import { gql } from '@apollo/client';
import { REPO_DETAILS } from './fragments';

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
