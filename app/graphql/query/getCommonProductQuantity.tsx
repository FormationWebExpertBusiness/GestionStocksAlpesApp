import {gql} from '@apollo/client';

export const GET_COMMONPRODUCT_QUANTITY = gql`
query GetCommonProduct_Quantity($commonProduct_id: ID!) {
    commonProduct(id: $commonProduct_id) {
        model
        quantity
        brand {
            name
        }
        category {
            name
        }
        quantity_low
        quantity_critical
    }
  }
`;
