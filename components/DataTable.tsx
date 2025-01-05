import { MaterialReactTable } from "material-react-table";
import { IDataTableProps } from "@/types/excel";
import TableOperationsToolbar from "./TableOperationToolbar";

const DataTable = ({
  data,
  columns,
  rowCount,
  pagination,
  onPaginationChange,
}: IDataTableProps) => {
  const mutableColumns = columns.map((column) => ({ ...column }));

  return (
    <MaterialReactTable
      columns={mutableColumns}
      data={data}
      enablePagination={true}
      manualPagination
      rowCount={rowCount}
      state={{ pagination }}
      onPaginationChange={onPaginationChange}
      enableFilters={false}
      enableDensityToggle={false}
      enableHiding={false}
      renderTopToolbar={TableOperationsToolbar}
      enableColumnActions={false}
      enableSorting={false}
    />
  );
};

export default DataTable;
