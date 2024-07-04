import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    name: "",
    number: "",
  },
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.name = action.payload;
      state.filters.number = action.payload;
    },
  },
});

export const filteredReducer = slice.reducer;
export const { changeFilter } = slice.actions;
