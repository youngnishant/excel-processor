import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentPage, setItemsPerPage } from "../store/reducers/excelSlice";

export const useExcel = () => {
  const dispatch = useDispatch();
  const excelState = useSelector((state: RootState) => state.excel);

  const getPaginatedData = () => {
    const startIndex = (excelState.currentPage - 1) * excelState.itemsPerPage;
    const endIndex = startIndex + excelState.itemsPerPage;
    return excelState.data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (items: number) => {
    dispatch(setItemsPerPage(items));
  };

  return {
    ...excelState,
    getPaginatedData,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
