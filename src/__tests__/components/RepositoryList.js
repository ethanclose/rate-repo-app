import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(
        within(firstRepositoryItem).getByTestId('fullName'),
      ).toHaveTextContent('jaredpalmer/formik');
      expect(
        within(firstRepositoryItem).getByTestId('description'),
      ).toHaveTextContent('Build forms in React, without the tears');
      expect(
        within(firstRepositoryItem).getByTestId('language'),
      ).toHaveTextContent('TypeScript');

      const imageA = within(firstRepositoryItem).getByTestId('repositoryImage');
      expect(imageA).toHaveProp('source', {
        uri: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
      });

      expect(
        within(firstRepositoryItem).getByTestId('fullName'),
      ).toHaveTextContent('jaredpalmer/formik');

      expect(
        within(secondRepositoryItem).getByTestId('fullName'),
      ).toHaveTextContent('async-library/react-async');
      expect(
        within(secondRepositoryItem).getByTestId('description'),
      ).toHaveTextContent('Flexible promise-based React data loader');
      expect(
        within(secondRepositoryItem).getByTestId('language'),
      ).toHaveTextContent('JavaScript');

      const imageB =
        within(secondRepositoryItem).getByTestId('repositoryImage');
      expect(imageB).toHaveProp('source', {
        uri: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
      });

      const firstCounts =
        within(firstRepositoryItem).getAllByTestId('countValue');

      const [firstStars, firstForks, firstReviews, firstRating] = firstCounts;

      expect(firstStars).toHaveTextContent('21.9k');
      expect(firstForks).toHaveTextContent('1.6k');
      expect(firstReviews).toHaveTextContent('3');
      expect(firstRating).toHaveTextContent('88');

      const secondCounts =
        within(secondRepositoryItem).getAllByTestId('countValue');

      const [secondStars, secondForks, secondReviews, secondRating] =
        secondCounts;

      expect(secondStars).toHaveTextContent('1.8k'); // 1760 -> 1.8k
      expect(secondForks).toHaveTextContent('69');
      expect(secondReviews).toHaveTextContent('3');
      expect(secondRating).toHaveTextContent('72');
    });
  });
});
