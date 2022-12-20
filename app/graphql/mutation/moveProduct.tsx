import {gql} from '@apollo/client';

export const MOVE_PRODUCT = gql`
mutation moveProduct($id: ID!, $rack_id: ID!, $rack_level: Int!, $user_id: ID!) {
  moveProduct(id: $id, rack_id: $rack_id, rack_level: $rack_level, user_id: $user_id) {
      id
  }
}
`;
