import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowParams
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

type MockItem = {
  id: number;
  userId: number;
  title: string;
  body: string;
}
const exerciseCols: GridColDef[] = [
  // { field: "id", hidden: true },
  { field: "title", width: 400 },
  { field: "userId" },
  { field: "body", width: 400 }
];
function generatePrimeNumbersObject(n: number): { [key: number]: boolean } {
  const primes: { [key: number]: boolean } = {};

  for (let i = 2; i <= n; i++) {
    let isPrime = true;

    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes[i] = true;
    }
  }

  return primes;
}
export default function QuickFilteringGrid() {
  const [primeNumbers, setPrimeNumbers] = React.useState({ 2: true });
  const query = useQuery<MockItem[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
        response.json()
      )
  });
  React.useEffect(() => {
    if (query.data) {
      let maxId = 1;
      query.data.forEach((item) => {
        maxId = Math.max(maxId, item.userId);
      });
      const maxPrimeNumbersNeeded = generatePrimeNumbersObject(maxId);
      setPrimeNumbers(maxPrimeNumbersNeeded);
    }
  }, [query.data]);

  const getRowClassName = React.useCallback(
    (params: GridRowParams) => {
      return primeNumbers[params.row.userId] && "italic";
    },
    [primeNumbers]
  );

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={query.data || []}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        getRowClassName={getRowClassName}
        columns={exerciseCols}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          }
        }}
      />
    </Box>
  );
}
