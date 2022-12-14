import {gql} from '@apollo/client';

export const GET_COMMONITEM_ITEMS = gql`
query GetCommonItem_Items($commonItem_id: ID!) {
    commonItem(id: $commonItem_id) {
        model
        brand {
            name
        }
        category {
            name
        }
        items {
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
