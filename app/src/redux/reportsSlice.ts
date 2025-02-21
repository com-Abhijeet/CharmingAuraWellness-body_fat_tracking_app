import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Report, Stats } from '../types/formTypes';

interface ReportsState {
  reports: Report[];
  stats: Stats | null;
}

const initialState: ReportsState = {
  reports: [],
  stats: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
      console.log(state.reports);
    },
    clearReports: (state) => {
      state.reports = [];
    },
    setStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
      console.log(state.stats);
    },
    clearStats: (state) => {
      state.stats = null;
    },
  },
});

export const { setReports, clearReports, setStats, clearStats } = reportsSlice.actions;

export default reportsSlice.reducer;