import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";


const expiredAfter: number = 60*15*1000;

export interface CouponsState{
    coupons: Coupon[];
    initTime: number;
}

const initState: CouponsState = {
    coupons: null,
    initTime: null,
}

export const CouponsSlice = createSlice({
    name: "Coupons Store",
    initialState: initState,
    reducers: {

        couponsFillCoupons: (state, action: PayloadAction<Coupon[]>) => {
            state.initTime = new Date().getTime();
            state.coupons = action.payload;
        },

        couponsDeleteById: (state, action: PayloadAction<number>) => {
            if ((new Date().getTime() - state.initTime) <= expiredAfter) {
                let indexToRemove = state.coupons.findIndex((coupon) => coupon.couponID === action.payload)
                state.coupons.splice(indexToRemove,1);
            }else{
                couponsStore.dispatch(couponsFormatState())
            }
        },

        couponsAddCoupon: (state, action: PayloadAction<Coupon>) => {
            if ((new Date().getTime() - state.initTime) <= expiredAfter) {
                if (state.coupons !== null) {
                    state.coupons.push(action.payload)
                }else{
                    state.coupons = [];
                    state.coupons.push(action.payload);
                }
            }else{
                couponsStore.dispatch(couponsFormatState())
            }
        },

        couponsUpdateCoupon: (state, action: PayloadAction<Coupon>) => {
            if (state.initTime !== (null && undefined)) {
                
            
            if ((new Date().getTime() - state.initTime) <= expiredAfter) {
                let indexToUpdate = state.coupons.findIndex((coupon) => coupon.couponID === action.payload.couponID)
                state.coupons[indexToUpdate] = action.payload
            }else{
                couponsStore.dispatch(couponsFormatState());
            }
        }
        },

        couponsFormatState: (state) => {
            state.coupons = null;
            state.initTime = null;
        },
    }
})

export const { couponsFillCoupons, couponsDeleteById, couponsAddCoupon, couponsFormatState, couponsUpdateCoupon } = CouponsSlice.actions;
export default CouponsSlice.reducer;

export const couponsStore = configureStore({
    reducer: CouponsSlice.reducer,
})

export type RootState = ReturnType<typeof couponsStore.getState>
export type AppDispach = typeof couponsStore.dispatch