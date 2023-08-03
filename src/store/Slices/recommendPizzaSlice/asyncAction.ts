import axios from "axios";
import { TypePizza } from "../../types/pizza";
import urls from "../../urls";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IParams {
    limit: string
}

export const fetchRecommendPizza = createAsyncThunk<TypePizza[], IParams>(
    'recommend/fetchRecommendPizza', 
    async (params) => {
        const url = new URL(urls.pizza);
        const { limit } = params;
        
        
        url.searchParams.append('limit', limit ? limit : '5' );
        const { data } = await axios.get(String(url));  
        
        return data
    }
)
  