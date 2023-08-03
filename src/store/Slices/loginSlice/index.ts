import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NotifyActions, UsersStatusActions, TypeReg } from "./type";
import { userAdmin } from "./data";

interface IState {
    user: UsersStatusActions,
    notify: NotifyActions
}

const initialState:IState = {
    user: localStorage.getItem('user') === UsersStatusActions.ADMIN? UsersStatusActions.ADMIN : UsersStatusActions.USER,
    notify: NotifyActions.DEFAULT,
} 

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logIn:(state, action:PayloadAction<TypeReg>) => {
            if(action.payload.password === userAdmin.password && action.payload.login === userAdmin.login) {
                state.user = UsersStatusActions.ADMIN;
                state.notify = NotifyActions.SUCCESS;
                localStorage.setItem('user', UsersStatusActions.ADMIN);
            } else {
                state.user = UsersStatusActions.USER;
                state.notify = NotifyActions.ERROR;
            } 
        }

    }
})


export const { logIn } = loginSlice.actions;

export default loginSlice.reducer;