import {gql} from '@apollo/client';

export const GET_RACK = gql`
query GetRackName($id: ID!, $level: Int!) {
    rack(id: $id, level: $level) {
        id
        name
        nb_products
    }
}
`;
