import { IExcelRow } from "@/types/excel";
import { IExcelDataState } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IExcelDataState = {
  data: [],
  columns: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalCount: 0,
  isLoading: false,
  error: null,
};

export const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    setExcelData: (state, action: PayloadAction<IExcelRow[]>) => {
      state.data = action.payload;
    },
    setExcelDataColumns: (state, action: PayloadAction<any>) => {
      state.columns = action.payload;
    },
    setTotalRecordsCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setExcelData,
  setExcelDataColumns,
  setTotalRecordsCount,
  setCurrentPage,
  setItemsPerPage,
  setLoading,
  setError,
} = excelSlice.actions;
export default excelSlice.reducer;
