import {gql} from '@apollo/client';

export const GET_ITEMS = gql`
query GetItems($rack_id: Int!, $rack_level: Int!) {
    items(rack_id: $rack_id, rack_level: $rack_level) {
                id
                serial_number
                model
                brand {
                    name
                }
                category {
                    name
                }
                created_at
                comment
    }
}
`;
