const gql = String.raw;

export const getAllProducts = gql`
  query getAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                sku
                availableForSale
                image {
                  src
                  altText
                }
              }
            }
          }
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

// utils/queries/getProductById.ts
export const getProductById = gql`
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            sku
            availableForSale
            image {
              src
              altText
            }
          }
        }
      }
    }
  }
`;

// export const getCollection = gql`
//   query {
//     collection(
//       id: "string"
//     ) {
//       id
//       title
//       products(first: 50, reverse: true) {
//         edges {
//           node {
//             id
//             title
//             createdAt
//             variants(first: 10) {
//               edges {
//                 node {
//                   id
//                   title
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   sku
//                   availableForSale
//                   image {
//                     src
//                     altText
//                   }
//                 }
//               }
//             }
//             images(first: 1) {
//               edges {
//                 node {
//                   url
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const getCollectionByHandle = gql`
  query GetCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: 50) {
        edges {
          node {
            id
            title
            createdAt
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCollectionId = gql`
  query GetCollectionById($id: ID!) {
    node(id: $id) {
      ... on Collection {
        id
        title
        description
        products(first: 50) {
          edges {
            node {
              id
              title
              createdAt
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    sku
                    availableForSale
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
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

export const newCustomer = gql`
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        email
        phone
        taxExempt
        firstName
        lastName
        amountSpent {
          amount
          currencyCode
        }
        smsMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
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

export const getCustomerByEmail = gql`
  query getCustomer($email: String!) {
    id
    email
    state
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

export const findAllUsers = gql`
  query {
    customers(first: 5, query: "country:canada") {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const activationUrl = gql`
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

export const getCollections = gql`
  query CustomCollectionList {
    collections(first: 50, query: "collection_type:custom") {
      nodes {
        id
        handle
        title
        updatedAt
        descriptionHtml
        # publishedOnCurrentPublication
        # sortOrder
        # templateSuffix
      }
    }
  }
`;

export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

export const createCart = gql`
  mutation {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const getCartById = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const addToCart = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const searchProductsByName = gql`
  query SearchProducts($searchTerm: String!) {
    products(first: 10, query: $searchTerm) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
