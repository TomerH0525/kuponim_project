import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import Company from "../Models/Company";

export interface CompaniesState {
  companies: Company[];
}

const initState: CompaniesState = {
  companies: null,
};

export const CompaniesSlice = createSlice({
  name: "Companies store",
  initialState: initState,
  reducers: {

    companiesFill: (state, action: PayloadAction<Company[]>) => {
      if (!Array.isArray(action.payload)) {
        state.companies = [];
        state.companies.push(action.payload);
      } else {
        state.companies = action.payload;
      }
    },

    companiesAddCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },

    companiesRemoveCompany: (state, action: PayloadAction<number>) => {
      const indexToRemove = state.companies.findIndex(
        (company) => company.id === action.payload
      );

      state.companies.splice(indexToRemove, 1);
    },

    companiesUpdateCompany: (state, action: PayloadAction<Company>) => {
      const indexToUpdate = state.companies.findIndex(
        (company) => company.id === action.payload.id
      );

      state.companies[indexToUpdate] = action.payload;
    },

    companiesResetStore: (state) => {
        state.companies = null;
    },

  }});

export const {
  companiesFill,
  companiesAddCompany,
  companiesRemoveCompany,
  companiesUpdateCompany,
  companiesResetStore,
} = CompaniesSlice.actions;
export default CompaniesSlice.reducer;

export const companiesStore = configureStore({
  reducer: CompaniesSlice.reducer,
});

export type RootState = ReturnType<typeof companiesStore.getState>;
export type AppDispach = typeof companiesStore.dispatch;
