import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import User from "../Models/User";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { customerFill, customerStore, emptyCustomer } from "./CustomerStore";
import { companyFill, companyStore, emptyCompany } from "./CompanyStore";
import ClientType from "../Models/ClientType";
import { companiesResetStore, companiesStore } from "./CompaniesStore";
import { customersResetStore, customersStore } from "./CustomersStore";

export interface AuthState{
    user: User;
    token: string;
}



const initState: AuthState = {
    user: (sessionStorage.getItem("token") !== null ? jwtDecode<User>(sessionStorage.getItem("token")) : null),
    token: (sessionStorage.getItem("token") !== null ? sessionStorage.getItem("token") : ""),
}

export const authSlice = createSlice({
    name: "userAuth",
    initialState: initState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {

            sessionStorage.setItem("token", action.payload)            
            state.user = jwtDecode(action.payload);
            state.token = action.payload;
        },
        
        logout: (state) => {
            switch (state.user?.clientType) {
                case ClientType.Administrator:
                    companiesStore.dispatch(companiesResetStore());
                    customersStore.dispatch(customersResetStore());
                break;
                
                case ClientType.Company:
                    companyStore.dispatch(emptyCompany())
                break;

                case ClientType.Customer:
                    customerStore.dispatch(emptyCustomer())
                break;

                default:
                    break;
            }
            state.token = "" ;
            state.user = null;
            sessionStorage.removeItem("token");
        },


}})


export const {login, logout} = authSlice.actions;
export default authSlice.reducer;


export const authStore = configureStore({
    reducer: authSlice.reducer
})

export type RootState = ReturnType<typeof authStore.getState>
export type AppDispach = typeof authStore.dispatch