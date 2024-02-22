import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";

export interface CompanyState{
    company: Company;
}


const initState: CompanyState = {
    company: null
  
}

export const CompanySlice = createSlice({
    name: "Company store",
    initialState: initState,
    reducers: {
    companyFill : (state , action: PayloadAction<Company>) => {
        if (!Array.isArray(action.payload.coupons)) {
            const companyActionCoupons:Coupon[] = []
            companyActionCoupons.push(action.payload.coupons);
            action.payload.coupons = companyActionCoupons;
            state.company = action.payload;
        }
        state.company = action.payload;
    },

    companyDeleteCoupon : (state , action: PayloadAction<number>) => {
        const indexToDelete = state.company.coupons.findIndex((coupon) => coupon.couponID === action.payload);
        state.company.coupons.splice(indexToDelete,1);
    },

    companyAddCoupon : (state, action: PayloadAction<Coupon>) => {
        state.company.coupons.push(action.payload);    
    },

    companyUpdateCoupon : (state, action: PayloadAction<Coupon>) => {
        const indexToUpdate = state.company.coupons.findIndex((coupon) => coupon.couponID === action.payload.couponID);
        state.company.coupons[indexToUpdate] = action.payload;
    },

    emptyCompany: (state) => {
        state.company = null;
    }

}})


export const { companyUpdateCoupon, companyAddCoupon, companyDeleteCoupon, companyFill, emptyCompany } = CompanySlice.actions;
export default CompanySlice.reducer;


export const companyStore = configureStore({
    reducer: CompanySlice.reducer
})

export type RootState = ReturnType<typeof companyStore.getState>
export type AppDispach = typeof companyStore.dispatch