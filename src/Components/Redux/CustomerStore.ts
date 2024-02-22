import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer";

export interface CustomerState{
    customer: Customer;
}


const initState: CustomerState = {
    customer: null
  
}

export const CustomerSlice = createSlice({
    name: "Customer store",
    initialState: initState,
    reducers: {
    customerFill : (state , action: PayloadAction<Customer>) => {
        if (!Array.isArray(action.payload.coupons)) {
            const customerActionCoupons: Coupon[] = [];
            customerActionCoupons.push(action.payload.coupons);
            action.payload.coupons = customerActionCoupons;
            state.customer = action.payload;
        }else{
        state.customer = action.payload;
        }
    },

    customerPurchaseCoupon : (state, action: PayloadAction<Coupon>) => {
        if (!state.customer.coupons) {
            state.customer.coupons = [];
        }
        state.customer.coupons.push(action.payload);    
    },

    customerUpdate : (state, action: PayloadAction<Coupon>) => {
        const indexToUpdate = state.customer.coupons.findIndex((coupon) => coupon.couponID === action.payload.couponID);
        state.customer.coupons[indexToUpdate] = action.payload;
    },

    emptyCustomer : (state) => {
        state.customer = null;
    }

}})


export const { customerUpdate, customerPurchaseCoupon, customerFill, emptyCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;


export const customerStore = configureStore({
    reducer: CustomerSlice.reducer
})

export type RootState = ReturnType<typeof customerStore.getState>
export type AppDispach = typeof customerStore.dispatch