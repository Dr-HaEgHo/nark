const gql = String.raw;

export const getAllProducts = gql`
  query getAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const createCustomer = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        # id
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const activateUrl = gql`
  mutation customerGenerateAccountActivationUrl($customerId: ID!) {
    customerGenerateAccountActivationUrl(customerId: $customerId) {
      accountActivationUrl
      userErrors {
        field
        message
      }
    }
  }
`;

export const createAccessToken = gql`
  mutation customerAccessTokenCreate {
    customerAccessTokenCreate(
      input: { email: "ghaida@example.com", password: "7dx2gx2Z" }
    ) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const findCustomer = gql`
  query {
    customer(customerAccessToken: "bobs_token") {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }
`;
