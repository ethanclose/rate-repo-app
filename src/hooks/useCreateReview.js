import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ owner, name, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName: owner,
          repositoryName: name,
          rating: Number(rating),
          text: text,
        },
      },
    });
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
