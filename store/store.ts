import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "./reducers/excelSlice";

export const store = configureStore({
  reducer: {
    excel: excelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
