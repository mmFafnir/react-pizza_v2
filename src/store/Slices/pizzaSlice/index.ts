import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { TypePizza } from "../../types/pizza";
import { Status } from "../../types/status";
import { deletePizza, fetchPizza, postPizza, putPizza } from "./asyncAction";


interface IState {
  items: TypePizza[],
  status: Status,
  loading: Status,
}

const initialState:IState = {
  items: [],
  status: Status.LOADING, // loading | success | error,
  loading: Status.DEFAULT,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action:PayloadAction<Status>) => {
      state.loading = action.payload
    }
    

  },
  
  extraReducers: (builder) => {
    //Fetch
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    
    builder.addCase(fetchPizza.rejected, (state, action) => {
      
      state.status = action.payload === Status.EMPTY ? Status.EMPTY : Status.ERROR;
      state.items = [];
    })


    //Put
    builder.addCase(putPizza.pending, (state) => {
      state.loading = Status.LOADING;
    })
    builder.addCase(putPizza.fulfilled, (state, action: PayloadAction<TypePizza>) => {
      state.items = state.items.map((pizza) => (pizza.defaultId === action.payload.defaultId) ? action.payload : pizza);
      state.loading = Status.SUCCESS
    })
    
    builder.addCase(putPizza.rejected, (state, action) => {
      state.status = action.payload === Status.EMPTY ? Status.EMPTY : Status.ERROR;
    })


    //Delete
    builder.addCase(deletePizza.pending, (state) => {
      // state.status = Status.LOADING;
    })
    builder.addCase(deletePizza.fulfilled, (state, action) => {
      state.items = state.items.filter(pizza => action.payload.defaultId !== pizza.defaultId);
      if(state.items.length === 0) { 
        state.status = Status.EMPTY
      }
    })
    
    builder.addCase(deletePizza.rejected, (state, action) => {
      state.status = action.payload === Status.EMPTY ? Status.EMPTY : Status.ERROR;
    })

    //Post
    builder.addCase(postPizza.pending, (state) => {
      state.loading = Status.LOADING;
    })
    builder.addCase(postPizza.fulfilled, (state, action) => {
      state.items = [action.payload, ...state.items]
      state.loading = Status.SUCCESS;
      state.status = Status.DEFAULT
    })

    builder.addCase(postPizza.rejected, (state, action) => {
      alert('Произошла ошибка при добавлении пиццы')
    })
  }
})



export const { setItems, setLoading } = pizzaSlice.actions;

export default pizzaSlice.reducer;