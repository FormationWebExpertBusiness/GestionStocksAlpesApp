import {gql} from '@apollo/client';

export const GET_COMMONITEM_QUANTITY = gql`
query GetCommonItem_Quantity($commonItem_id: ID!) {
    commonItem(id: $commonItem_id) {
        model
        quantity
        brand {
            name
        }
        category {
            name
        }
        quantity_urgent
        quantity_warning
    }
  }
`;
