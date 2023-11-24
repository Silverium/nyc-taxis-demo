import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,

} from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { certificatesColumnsDefinitions } from "./config"
import getTaxiData from "../../services/getCertificates";

export default function DefaultGrid() {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 100,
    page: 1,
  });
  const [rowCount, setRowCount] = React.useState(0);
  const query = useQuery<any>({
    queryKey: ["taxi-data", paginationModel.page, paginationModel.pageSize],
    queryFn: () => getTaxiData(paginationModel.page, paginationModel.pageSize),
    initialData: { data: [] },
    placeholderData: keepPreviousData,
  });
  const rows = query.data.data;
  React.useEffect(() => {
    if (query.data?.rows_before_limit_at_least)
      setRowCount(query.data.rows_before_limit_at_least);
  }, [query.data]);

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        sx={{
          height: "calc(100vh - 200px)",
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .MuiDataGrid-columnHeader': {
            color: 'GrayText',
            textTransform: 'uppercase',
          },
        }}
        loading={query.isLoading}
        rows={rows}
        
        columns={certificatesColumnsDefinitions}
        slots={{ toolbar: GridToolbar }}
        paginationMode="server"
        rowCount={rowCount}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
}
