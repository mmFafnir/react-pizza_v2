import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../../types/status";
import { TypePizza } from "../../types/pizza";
import { fetchRecommendPizza } from "./asyncAction";



interface IState {
  items: TypePizza[],
  status: Status
}

const initialState:IState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

const recommendPizzaSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    setRecommend: (state, action) => {
      state.items = action.payload;
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendPizza.pending, (state) => {
      state.items = []
      state.status = Status.LOADING;
    });
    
    builder.addCase(fetchRecommendPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    
    builder.addCase(fetchRecommendPizza.rejected, (state) => {
      state.status = Status.ERROR;
    })
  }
})



export const { setRecommend } = recommendPizzaSlice.actions;

export default recommendPizzaSlice.reducer;
