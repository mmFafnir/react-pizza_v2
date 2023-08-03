import { calcTotalLength } from "./calcTotalLength";
import { calcTotalPrice } from "./calcTotalPrice";


interface IFormLs {
  items: TypeCartPizza[],
  totalPrice: number,
  totalLength: number 
}

export const getFromLS = ():IFormLs => {
    const data = localStorage.getItem('cart');
    const items:TypeCartPizza[] = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const totalLength = calcTotalLength(items);
    
    return {
      items: items,
      totalPrice,
      totalLength,
    };
}

export const setToLS = (key: string, items:TypeCartPizza[]) => localStorage.setItem(key, JSON.stringify(items));