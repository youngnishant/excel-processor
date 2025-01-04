import { MaterialReactTable } from "material-react-table";
import { DataTableProps } from "@/types/excel";

const DataTable = ({
  data,
  columns,
  rowCount,
  pagination,
  onPaginationChange,
}: DataTableProps) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enablePagination={true}
      manualPagination
      rowCount={rowCount}
      state={{ pagination }}
      onPaginationChange={onPaginationChange}
    />
  );
};

export default DataTable;
