import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/status";
import { fetchPizzaById } from "./asyncActions";
import { TypePizza } from "../../types/pizza";


interface IState {
  item: TypePizza|null,
  status: Status
}

const initialState:IState = {
    item: null,
    status: Status.LOADING // loading | success | error
}


const pizzaByIdSlice = createSlice({
    name: 'pizzaById',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchPizzaById.pending, (state) => {
        state.status = Status.LOADING;
        state.item = null;
      })
      builder. addCase(fetchPizzaById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = Status.SUCCESS;
      })
      builder.addCase(fetchPizzaById.rejected, (state) => {
        state.status = Status.ERROR;
        state.item = null;
      })
      
    }
})

// export const { } = pizzaByIdSlice.actions;

export default pizzaByIdSlice.reducer;