import {gql} from '@apollo/client';

export const GET_PRODUCT_MODAL_DATA = gql`
query Get_Product_Modal_Data($product_id: ID!) {
    product(id: $product_id) {
        id
        serial_number
        brand {
            name
        }
        category {
            name
        }
        model
        rack {
            name
        }
        rack_level
        created_at
    }
  }
`;
