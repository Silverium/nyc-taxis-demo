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
import { NumberInput } from "../NumberInput";
import { useDispatch } from "react-redux";
import toasterSlice from "../../store/toaster";
import { FormControl, FormControlLabel } from "@mui/material";
import { TaxiApiResponse } from "../../types/TaxiApiResponse";
export default function DefaultGrid() {
  const pageParam = useSearchParam('page');
  const pageSizeParam = useSearchParam('pageSize');
  const hiddenColumnsParam = useSearchParam('hiddenColumns');
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: roundToNearest(parseInt(pageSizeParam || "100"), [25, 50, 100]), // muix datagrid only supports 25,50,100
    page: Math.max(parseInt(pageParam || "0"), 0), // page to be minimum 0
  });
  const [pageInput, setPageInput] = React.useState<number>(paginationModel.page);
  const dispatch = useDispatch();
  React.useEffect(() => {
    // update query param from location without triggering a reload
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', paginationModel.page.toString());
    searchParams.set('pageSize', paginationModel.pageSize.toString());
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`);
  }, [paginationModel])
  React.useEffect(() => {
    // update paginationModel from pageInput
    setPaginationModel(prev => ({ ...prev, page: pageInput }));
  }
    , [pageInput]);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>(decodeURIComponent(hiddenColumnsParam || "").split(',').reduce((acc, curr) => ({ ...acc, [curr]: false }), {}) || {});
  React.useEffect(() => {
    // update query param from location without triggering a reload
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('hiddenColumns', Object.keys(columnVisibilityModel).filter(key => !columnVisibilityModel[key]).join(','));
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`);
  }, [columnVisibilityModel])

  const [rowCount, setRowCount] = React.useState(0);
  const query = useQuery<Partial<TaxiApiResponse>>({
    queryKey: ["taxi-data", pageInput, paginationModel.pageSize],
    queryFn: () => getTaxiData(pageInput, paginationModel.pageSize),
     initialData: { data: [] },
    placeholderData: keepPreviousData,
  });
  const rows = query.data.data!;
  React.useEffect(() => {
    if (rowCount > 0 && pageInput > Math.floor(rowCount / paginationModel.pageSize)) {
      dispatch(toasterSlice.actions.open({
        message: `You've reached the maximum number of rows (${rowCount}). Please decrease the page number to ${Math.floor(rowCount / paginationModel.pageSize)} or less.}`,
        severity: "warning",
      }))
    }
  }, [rowCount, paginationModel.pageSize, pageInput]);

  React.useEffect(() => {
    // update rowCount when data is fetched
    if (query.data?.rows_before_limit_at_least && !query.isRefetching) {
      setRowCount(query.data.rows_before_limit_at_least);
    }
  }, [query]);

  return (
    <Box sx={{ width: 1 }}>
      <FormControl>
        <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { paddingX: "10px" } }} label="Page" labelPlacement="start" control={
          <NumberInput value={pageInput} min={0} onInputChange={event => console.log("inputChange", event.currentTarget.value)} onChange={(event, value) => {
            const newValue = value || 0;
            setPageInput(newValue);
          }} />
        } />
      </FormControl>
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
      />
    </Box>
  );
}
