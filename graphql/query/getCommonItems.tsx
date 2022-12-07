import {gql} from '@apollo/client';

export const GET_COMMONITEMS = gql`
query GetCommonItems {
    commonItems {
        id
        model
        quantity_warning
        quantity_urgent
        brand {
            name
        }
        category {
            name
        }
        items {
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
