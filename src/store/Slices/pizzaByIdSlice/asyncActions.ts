import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypePizza } from "../../types/pizza";
import axios from "axios";
import urls from "../../urls";


interface IParamsFetch  {
    id: string|number
}

export const fetchPizzaById = createAsyncThunk<TypePizza, IParamsFetch>(
    'pizzaById/fetchPizzaById', 
    async (params) => {
        const url = new URL(urls.pizza+'/'+params.id);
        const { data } = await axios.get(String(url));  
        return data
    }
)



interface IParamsPut {
    id: string|number,
    pizza: TypePizza
}

