import {gql} from '@apollo/client';

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!, $user_id: ID!) {
  deleteProduct(id: $id, user_id: $user_id) {
      id
  }
}
`;
