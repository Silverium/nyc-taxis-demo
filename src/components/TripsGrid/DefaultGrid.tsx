import React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,

} from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { certificatesColumnsDefinitions } from "./config"
import getTaxiData from "../../services/getTaxiData";
import { useSearchParam } from 'react-use';
import roundToNearest from "../../utils/roundToNearest";
export default function DefaultGrid() {
  const pageParam = useSearchParam('page');
  const pageSizeParam = useSearchParam('pageSize');
  const hiddenColumnsParam = useSearchParam('hiddenColumns');
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: roundToNearest(parseInt(pageSizeParam || "100"),[25,50,100]), // muix datagrid only supports 25,50,100
    page: Math.max(parseInt(pageParam || "0"), 0), // page to be minimum 0
  });

  React.useEffect(() => {
    // update query param from location without triggering a reload
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', paginationModel.page.toString());
    searchParams.set('pageSize', paginationModel.pageSize.toString());
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`);
  }, [paginationModel])
  
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>(decodeURIComponent(hiddenColumnsParam || "").split(',').reduce((acc, curr) => ({ ...acc, [curr]: false }), {}) || {});
  React.useEffect(() => {
    // update query param from location without triggering a reload
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('hiddenColumns', Object.keys(columnVisibilityModel).filter(key => !columnVisibilityModel[key]).join(','));
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`);
  }, [columnVisibilityModel])

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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
}
