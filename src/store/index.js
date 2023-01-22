import { configureStore } from "@reduxjs/toolkit";

import sliceReducer from "./slice";

import sliceDetail from "./sliceDetail";

export default configureStore({
  reducer: {
    user: sliceReducer,
    detail: sliceDetail,
  },
});
