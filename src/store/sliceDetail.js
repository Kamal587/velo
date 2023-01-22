import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  link: "",
  dataOfficer: "",
};

const sliceDetail = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDetail(state, action) {
      state.link = action.payload.link;
    },
    setOfficer(state, action) {
      state.dataOfficer = action.payload.dataOfficer;
    },
  },
});

export const { setDetail, setOfficer } = sliceDetail.actions;

export default sliceDetail.reducer;
