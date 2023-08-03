import { createAsyncThunk } from "@reduxjs/toolkit";
import { PropertySort, TypeFilter } from "../../types/filter";
import { TypePizza } from "../../types/pizza";
import { Status } from "../../types/status";
import axios from "axios";
import urls from "../../urls";
import { URL } from "url";



export const fetchPizza = createAsyncThunk<TypePizza[], TypeFilter>(
    'pizza/fetchPizza', 
    async (params, thunkAPI) => {
        const { category, sort, search, page=1, limit=4  } = params;
        let url = urls.pizza + '?';
        url = url + `orderby=${sort.property}&`;
        // url.searchParams.append('orderby', sort.property);
        if(limit !== null) {
            url = url + `page=${String(category.length !== 0 ? 1 : page)}&limit=${limit}&`;
            // url.searchParams.append('page', String(category.length !== 0 ? 1 : page));
            // url.searchParams.append('limit', String(limit));
        }
        if(search.length > 0) {
            url = url + `search=${search}&`;
            // url.searchParams.append('search', search);
        } else {
            url = url + `category=${category}&`
            // url.searchParams.append('category', category);
        }

        url = url + `order=${sort.property === PropertySort.TITLE ? 'asc' : 'desc'}`
        console.log(url)
        
        // url.searchParams.append('order', sort.property === PropertySort.TITLE ? 'asc' : 'desc')
        const {data}  = await axios.get<TypePizza[]>(String(url));
        
        if(data.length === 0) return thunkAPI.rejectWithValue(Status.EMPTY);
        return thunkAPI.fulfillWithValue(data)
    }
)



export const putPizza = createAsyncThunk<TypePizza, TypePizza>(
    'pizza/putPizza',
    async (pizza) => {
        const url = urls.pizza+'/'+pizza.id;
        const { data } = await axios.put(String(url), pizza);
        return data
    }
)


export const deletePizza = createAsyncThunk<TypePizza, string>(
    'pizza/deletePizza', 
    async (id) => {
        const url = urls.pizza+'/' + id;
        const { data } = await axios.delete(String(url));
        return data
        
    }
)
  
  

export const postPizza = createAsyncThunk(
    'pizza/postPizza', 
    async (pizza: TypePizza) => {
        let url = urls.pizza;
        const { data } = await axios.post(url, pizza);
        return data;
    }
)