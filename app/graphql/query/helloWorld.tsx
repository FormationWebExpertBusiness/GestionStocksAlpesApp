import {gql} from '@apollo/client';

export const HELLO_WORLD = gql`
      query GetHello {
        hello
      }
    `;
