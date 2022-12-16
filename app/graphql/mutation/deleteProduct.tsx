import {gql} from '@apollo/client';

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!, $comment: String, $user_id: ID!) {
  deleteProduct(id: $id, comment: $comment, user_id: $user_id) {
      id
  }
}
`;
