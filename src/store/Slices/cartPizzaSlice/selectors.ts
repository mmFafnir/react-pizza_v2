import { RootState } from "../..";



export const selectCart = (state:RootState) => state.carts.items;
export const selectCartById = (id:string) => (state:RootState) => state.carts.items.find(pizza => pizza.defaultId === id);
export const selectCartAllById = (id:string|number) => (state:RootState) => state.carts.items.filter(pizza => Number(pizza.defaultId) === Number(id));
export const selectTotalPrice = (state:RootState) => state.carts.totalPrice;    
export const selectTotalLength = (state:RootState) => state.carts.totalLength;
    