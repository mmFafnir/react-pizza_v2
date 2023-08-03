
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PropertySort, TypeFilter, TypeSortFilter } from '../../types/filter';


const initialState:TypeFilter = {
    category: '',
    search: '',
    page: 1,
    limit: 8,
    sort: {
        checked: true,
        value: 'популятность',
        property: PropertySort.RATING,
    },
};


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setSort: (state, action: PayloadAction<TypeSortFilter>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }


});


export const { setCategory, setSort, setSearch } = filterSlice.actions;

export default filterSlice.reducer;