import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerDetails } from '../types/formTypes';

interface CustomersState {
  customers: CustomerDetails[] | null;
  stats: any | null; // Add a new state for statistics
}

const initialState: CustomersState = {
  customers: [],
  stats: null, // Initialize the stats state
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<CustomerDetails[]>) => {
      state.customers = action.payload;
    },
    clearCustomers: (state) => {
      state.customers = null;
    },
    setCustomerStats: (state, action: PayloadAction<any>) => {
      state.stats = action.payload; // Set the customer statistics
    },
    clearCustomerStats: (state) => {
      state.stats = null; // Clear the customer statistics
    },
  },
});

export const { setCustomers, clearCustomers, setCustomerStats, clearCustomerStats } = customersSlice.actions;

export default customersSlice.reducer;