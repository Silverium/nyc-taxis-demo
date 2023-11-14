import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowParams,
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { InputBase, InputBaseProps, Paper, Popper } from "@mui/material";

type MockItem = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
function EditTextarea(props: GridRenderEditCellParams<any, string>) {
  const { id, field, value, colDef, hasFocus } = props;
  const [valueState, setValueState] = React.useState(value);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>();
  const [inputRef, setInputRef] = React.useState<HTMLInputElement | null>(null);
  const apiRef = useGridApiContext();

  React.useLayoutEffect(() => {
    if (hasFocus && inputRef) {
      inputRef.focus();
    }
  }, [hasFocus, inputRef]);

  const handleRef = React.useCallback((el: HTMLElement | null) => {
    setAnchorEl(el);
  }, []);

  const handleChange = React.useCallback<NonNullable<InputBaseProps['onChange']>>(
    (event) => {
      const newValue = event.target.value;
      setValueState(newValue);
      apiRef.current.setEditCellValue(
        { id, field, value: newValue, debounceMs: 200 },
        event,
      );
    },
    [apiRef, field, id],
  );

  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div
        ref={handleRef}
        style={{
          height: 1,
          width: colDef.computedWidth,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      {anchorEl && (
        <Popper open anchorEl={anchorEl} placement="bottom-start">
          <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
            <InputBase
              multiline
              rows={4}
              value={valueState}
              sx={{ textarea: { resize: 'both' }, width: '100%' }}
              onChange={handleChange}
              inputRef={(ref) => setInputRef(ref)}
            />
          </Paper>
        </Popper>
      )}
    </div>
  );
}
const exerciseCols: GridColDef[] = [
  { field: "id", hideable: true },
  { field: "title", width: 400, headerName: "Title", editable: true, renderEditCell: (params) => <EditTextarea {...params} />, type: "string" },
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "body", width: 400, headerName: "Text Body" },
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
  const [primeNumbers, setPrimeNumbers] = React.useState<{
    [key: number]: boolean;
  }>({ 2: true });
  const query = useQuery<MockItem[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
        response.json(),
      ),
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
      if (primeNumbers[params.row.userId]) {
        return "italic";
      }
      return "";
    },
    [primeNumbers],
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
            showQuickFilter: true,
          },
        }}
        onCellEditStop={(params, event)=> console.log("we could save here",{params, event})}
      />
    </Box>
  );
}
