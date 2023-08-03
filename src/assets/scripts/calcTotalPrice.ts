export const calcTotalPrice = (items: TypeCartPizza[]) => items.reduce((partialSum, a) =>partialSum + a.price*(a.quantity ? a.quantity : 1), 0);
