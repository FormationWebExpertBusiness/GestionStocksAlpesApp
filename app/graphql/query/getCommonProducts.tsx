import {gql} from '@apollo/client';

export const GET_COMMONPRODUCTS = gql`
query GetCommonProducts {
    commonProducts {
        id
        model
        quantity_low
        quantity_critical
        brand {
            name
        }
        category {
            name
        }
    }
  }
`;
