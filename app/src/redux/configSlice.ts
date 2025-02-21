import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  isSidebarCollapsed: boolean;
}

const initialState: ConfigState = {
  isSidebarCollapsed: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.isSidebarCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed } = configSlice.actions;
export default configSlice.reducer;