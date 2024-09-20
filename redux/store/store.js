import { configureStore } from "@reduxjs/toolkit";
import forceRenderReducer from "../slices/forceRender";
import cartSliceReducer from "../slices/handleCart";
export const store = configureStore({
  reducer: {
    forceRender: forceRenderReducer,
    cartSlice: cartSliceReducer,
  },
});
