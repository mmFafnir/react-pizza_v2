import { configureStore } from '@reduxjs/toolkit';
import pizzaSlice from './Slices/pizzaSlice';
import filterSlice from './Slices/filterSlice/';
import recommendPizzaSlice from './Slices/recommendPizzaSlice';
import cartPizzaSlice from './Slices/cartPizzaSlice';
import pizzaByIdSlice from './Slices/pizzaByIdSlice';
import modalSlice from './Slices/modalSlice';
import loginSlice from './Slices/loginSlice';


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        pizza: pizzaSlice,
        pizzaById: pizzaByIdSlice,
        carts: cartPizzaSlice,
        recommend: recommendPizzaSlice,
        modal: modalSlice,
        login: loginSlice
        
    },
  })
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;