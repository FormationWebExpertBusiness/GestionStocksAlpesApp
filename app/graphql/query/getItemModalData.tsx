import {gql} from '@apollo/client';

export const GET_ITEM_MODAL_DATA = gql`
query Get_Item_Modal_Data($item_id: ID!) {
    item(id: $item_id) {
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
