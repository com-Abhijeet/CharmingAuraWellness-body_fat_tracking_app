import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import reportReducer from "../redux/reportsSlice"
import configReducer from "../redux/configSlice"
import customersReducer from "../redux/customersSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    reports : reportReducer,
    config: configReducer,
    customers: customersReducer,
  },
});

export default store;