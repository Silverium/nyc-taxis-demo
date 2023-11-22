import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridCellParams,

} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

type CertificateItem = {
  id: number;
  uniqueNumber: string;
  companyName: string;
  countryCode: string;
  combinedCertificates?: CertificateItem[];
  carbonUser: {
    company: {
      name: string;
      address: {
        country: string;
      }
    }
  }
};
type ApiResult = {
  result: {
    data: CertificateItem[];
  }
};

const exerciseCols: GridColDef[] = [
  { field: "id", hideable: true },
  { field: "uniqueNumber", width: 400, headerName: "Unique ID",  type: "string",  },
  { field: "companyName", headerName: "Originator", width: 200 },
  { field: "countryCode", width: 100, headerName: "Originator Country" },
  {
    field: "Owner", width: 200, headerName: "Owner", valueGetter(params) {
      return params.row.carbonUser.company.name
    },
  },
  {
    field: "OwnerCountry", width: 100, headerName: "Owner Country", valueGetter(params) {
      return params.row.carbonUser.company.address.country
    }
  },
  { field: "status", width: 100, headerName: "Status", },
  {field: "favorite", width: 100, headerName: "", type: "boolean", renderCell(params) {
    const isFavorite = Math.random() > 0.5; // TODO: replace with actual data from localStorage
    return isFavorite ? <TurnedInNotIcon /> : <TurnedInIcon />
  },},
];

export default function QuickFilteringGrid() {
  const [primeNumbers, setPrimeNumbers] = React.useState<{
    [key: number]: boolean;
  }>({ 2: true });
  const query = useQuery<CertificateItem[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://demo.api.agreena.com/api/public/carbon_registry/v1/certificates?includeMeta=true&page=1&limit=10", {
        headers: {
          "API-ACCESS-TOKEN": "Commoditrader-React-FE-Farmer"
        }
      }).then((response) =>
        response.json(),
      ).then(({ result: { data } }: ApiResult) => data.flatMap((certificate) => {
        return certificate.combinedCertificates || certificate

      })).catch((err) => {
        console.error(err);
        return [];
      }),
    initialData: [],
  });
  React.useEffect(() => {
    if (query.data) {
      console.log(`%cquery.data`, 'background-color: lime;', query.data);
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
