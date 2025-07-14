import { createSlice } from "@reduxjs/toolkit";

interface NavState {
  currentPage: "dashboard" | "transactions" | "settings" | "about";
}

const initialState: NavState = {
  currentPage: "dashboard",
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = navSlice.actions;
export default navSlice.reducer;
