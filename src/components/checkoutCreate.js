import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {
  checkoutCreate(input: { lineItems: $lineItems }) {
    checkout {
      id
      webUrl
    }
    checkoutUserErrors {
      message
      field
    }
  }
}
`;
