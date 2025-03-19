const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch(query) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;
  
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(URL, options);
    return await response.json();
  } catch (error) {
    throw new Error("Shopify Fetch Error: " + error.message);
  }
}

export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 5) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  return response.data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    description: node.description,
    image: node.images.edges[0]?.node.src,
    price: node.variants.edges[0]?.node.priceV2.amount,
  }));
}
