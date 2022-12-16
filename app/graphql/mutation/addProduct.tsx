import {gql} from '@apollo/client';

export const ADD_PRODUCT = gql`
mutation addProduct(
        $common_id: ID!,
        $serial_number: String!,
        $price: Float!,
        $comment: String,
        $rack_level: Int!,
        $rack_id: ID!,
        $user_id: ID!
    )
    {
        addProduct(
            common_id: $common_id,
            serial_number: $serial_number,
            price: $price,
            comment: $comment,
            rack_level: $rack_level,
            rack_id: $rack_id,
            user_id: $user_id
        )
        {
            id
        }
    }
`;
