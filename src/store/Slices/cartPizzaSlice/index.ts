import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../assets/scripts/calcTotalPrice";
import { calcTotalLength } from "../../../assets/scripts/calcTotalLength";
import { getFromLS, setToLS } from "../../../assets/scripts/localStorage";


export interface ICartPizzaState {
    items: TypeCartPizza[],
    totalPrice: number,
    totalLength: number
}

const initialState:ICartPizzaState = getFromLS()

const cartPizzaSlice = createSlice({
    name: 'cartPizza',
    initialState,

    reducers: {
        addItem: (state, action: PayloadAction<TypeCartPizza>) => {
            const dopId = action.payload.size+action.payload.type
            const findItem = state.items.find(item => item.defaultId+item.size+item.type === action.payload.defaultId+dopId);
            if(findItem) {
                findItem.quantity!++;
            } else {
                state.items = [...state.items, {...action.payload, quantity: 1, id: action.payload.defaultId+dopId}]
            }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalLength = calcTotalLength(state.items);

            setToLS('cart', state.items);

        },

        plusQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if(!item) return;
            item.quantity = item.quantity!+1;
            state.totalLength = calcTotalLength(state.items);
            state.totalPrice = calcTotalPrice(state.items);
            setToLS('cart', state.items);
        },
        minusQuantity: (state, action: PayloadAction<string>) => { 
            const item = state.items.find(item => item.id === action.payload);
            if(!item) return;
            if(item.quantity===1) return;
            item.quantity = item.quantity!-1;
            state.totalPrice = calcTotalPrice(state.items);
            state.totalLength = calcTotalLength(state.items);
            setToLS('cart', state.items);
        },

        deleteItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
            state.totalLength = calcTotalLength(state.items);
            setToLS('cart', state.items);
        },

        deleteItemByFullPizza: (state, action: PayloadAction<string>) => {
            const items = state.items.filter(item => item.defaultId === action.payload);
            if(!items) return;
            if(items[0].quantity! > 1) {
                items[0].quantity = items[0].quantity!-1;
            } else {
                state.items.splice (0, 1);
            }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalLength = calcTotalLength(state.items);
            setToLS('cart', state.items);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalLength = 0;
            setToLS('cart', state.items);
        }
    },


})



export const { addItem, plusQuantity, minusQuantity, deleteItem, deleteItemByFullPizza, clearCart } = cartPizzaSlice.actions;

export default cartPizzaSlice.reducer;