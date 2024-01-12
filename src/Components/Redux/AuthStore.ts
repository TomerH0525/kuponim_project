import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import User from "../Models/User";
import { jwtDecode } from "jwt-decode";

export interface AuthState{
    user: User;
    token: string;
}


const initState: AuthState = {
    user: sessionStorage.getItem("token") ? jwtDecode(sessionStorage.getItem("token")) : null,
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
}

export const authSlice = createSlice({
    name: "userAuth",
    initialState: initState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {

            sessionStorage.setItem("token", action.payload)
            const jsonFromToken: {user: User} = jwtDecode(action.payload)
            state.user = jsonFromToken.user;
            state.token = action.payload;
            
        },
        
        logout: (state) => {
            state.token = "" ;
            state.user = null;
            sessionStorage.removeItem("token");
        },

    }

})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;


export const authStore = configureStore({
    reducer: authSlice.reducer
})

export type RootState = ReturnType<typeof authStore.getState>
export type AppDispach = typeof authStore.dispatch