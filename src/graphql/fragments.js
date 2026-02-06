import { gql } from '@apollo/client';

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
    user {
      id
      username
    }
    userHasReviewed
    watchersCount
  }
`;
