export function getLowestPrice(products: any[]) {
  if (!products.length) return null;

  let lowestPrice = products[0].price;

  for (let i = 1; i < products.length; i++) {
    if (products[i].price < lowestPrice) {
      lowestPrice = products[i].price;
    }
  }

  return lowestPrice;
}

export function showLowestPrice(products: any[]) {
  console.log("LOWEST PRICE::::::", Math.min(...products.map(product => product.node.priceV2.amount)))
  return Math.min(...products.map(product => product.node.priceV2.amount));
}