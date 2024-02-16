import { configureStore, createSlice } from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";

export interface CompanyCouponsState{
    coupon: Coupon[];
}


const initState: CompanyCouponsState = {
    coupon: []
  
}

export const CompanyCouponsSlice = createSlice({
    name: "CompanyCoupons",
    initialState: initState,
    reducers: {
    


}})


export const { } = CompanyCouponsSlice.actions;
export default CompanyCouponsSlice.reducer;


export const companyCouponsStore = configureStore({
    reducer: CompanyCouponsSlice.reducer
})

export type RootState = ReturnType<typeof companyCouponsStore.getState>
export type AppDispach = typeof companyCouponsStore.dispatch