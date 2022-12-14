import {gql} from '@apollo/client';

export const GET_COMMONPRODUCT_PRODUCTS = gql`
query GetCommonProduct_Products($commonProduct_id: ID!) {
    commonProduct(id: $commonProduct_id) {
        model
        brand {
            name
        }
        category {
            name
        }
        products {
            id
            serial_number
            rack {
                id
                name
            }
            rack_level
            created_at
            comment
        }
    }
  }
`;
