import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { IExcelRow } from "@/types/excel";
import { Box, Typography } from "@mui/material";

const PreviewTable = ({
  data,
  title,
}: {
  data: IExcelRow[];
  title: string;
}) => {
  const columns: MRT_ColumnDef<IExcelRow>[] = Object.keys(data[0]).map(
    (key) => ({
      accessorKey: key,
      header: key,
    })
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        // muiTableHeadCellProps={{
        //   sx: {
        //     backgroundColor: "#f5f5f5",
        //     fontWeight: "bold",
        //   },
        // }}
      />
    </Box>
  );
};

export default PreviewTable;
