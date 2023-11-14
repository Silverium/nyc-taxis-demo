import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridCellParams,

} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import EditTextarea from "./EditTextarea";
import generatePrimeNumbersObject from "../utils/generatePrimeNumbersObject";

type MockItem = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const exerciseCols: GridColDef[] = [
  { field: "id", hideable: true },
  { field: "title", width: 400, headerName: "Title", editable: true, renderEditCell: (params) => <EditTextarea {...params} />, type: "string" },
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "body", width: 400, headerName: "Text Body" },
];

export default function QuickFilteringGrid() {
  const [primeNumbers, setPrimeNumbers] = React.useState<{
    [key: number]: boolean;
  }>({ 2: true });
  const query = useQuery<MockItem[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
        response.json(),
      ).catch((err) => {
        console.error(err);
        return [];
      }),
    initialData: [],
  });
  React.useEffect(() => {
    if (query.data) {
      let maxUserId = 1;
      // find the max id so we don't calculate for unnecessary prime numbers
      query.data.forEach((item) => {
        maxUserId = Math.max(maxUserId, item.userId);
      });
      const maxPrimeNumbersNeeded = generatePrimeNumbersObject(maxUserId);
      setPrimeNumbers(maxPrimeNumbersNeeded);
    }
  }, [query.data]);

  const getCellClassName = React.useCallback(
    (params: GridCellParams) => {
      if (params.field === "title" && primeNumbers[params.row.userId]) {
        return "italic";
      }
      return "";
    },
    [primeNumbers],
  );

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={query.data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        getCellClassName={getCellClassName}
        columns={exerciseCols}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        onCellEditStop={(params, event) => console.log("we could save here", { params, event })}
      />
    </Box>
  );
}
