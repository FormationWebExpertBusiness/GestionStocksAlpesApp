import {gql} from '@apollo/client';

export const GET_COMMONPRODUCTS_ADD = gql`
query GetCommonProducts_Add {
    commonProducts {
        id
        model
        brand {
            name
        }
        category {
            name
        }
    }
  }
`;
