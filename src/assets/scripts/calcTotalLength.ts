

export const calcTotalLength = (items: TypeCartPizza[]) => items.reduce((partialSum, a) => partialSum + (a.quantity ? a.quantity : 1), 0);


