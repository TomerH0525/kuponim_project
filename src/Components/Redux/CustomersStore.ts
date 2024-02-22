import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import Customer from "../Models/Customer";

export interface CustomersState {
  customers: Customer[];
}

const initState: CustomersState = {
  customers: null,
};

export const CustomersSlice = createSlice({
  name: "Companies store",
  initialState: initState,
  reducers: {

    customersFill: (state, action: PayloadAction<Customer[]>) => {
      if (!Array.isArray(action.payload)) {
        state.customers = [];
        state.customers.push(action.payload);
      } else {
        state.customers = action.payload;
      }
    },

    customersAddCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },

    customersRemoveCustomer: (state, action: PayloadAction<number>) => {
      const indexToRemove = state.customers.findIndex(
        (customer) => customer.customerID === action.payload
      );
      state.customers.splice(indexToRemove, 1);
    },

    customersUpdateCustomer: (state, action: PayloadAction<Customer>) => {
      const indexToUpdate = state.customers.findIndex(
        (customer) => customer.customerID === action.payload.customerID
      );
      state.customers[indexToUpdate] = action.payload;
    },

    customersResetStore: (state) => {
        state.customers = null;
    },

  },
});

export const {
  customersFill,
  customersAddCustomer,
  customersRemoveCustomer,
  customersUpdateCustomer,
  customersResetStore,
} = CustomersSlice.actions;
export default CustomersSlice.reducer;

export const customersStore = configureStore({
  reducer: CustomersSlice.reducer,
});

export type RootState = ReturnType<typeof customersStore.getState>;
export type AppDispach = typeof customersStore.dispatch;
