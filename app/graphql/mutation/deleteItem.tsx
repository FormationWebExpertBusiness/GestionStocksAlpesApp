import {gql} from '@apollo/client';

export const DELETE_ITEM = gql`
mutation deleteItem($id: ID!) {
  deleteItem(id: $id) {
      id
  }
}
`;
