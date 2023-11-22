import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,

} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Typography, Tooltip } from "@mui/material";

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
async function copyToClipboard(data: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(data);
    // TODO: move to a toast
    console.log('Data copied to clipboard');
  } catch (err) {
    console.error('Failed to copy data to clipboard:', err);
  }
}

const exerciseCols: GridColDef[] = [
  {
    field: "uniqueNumber", width: 400, headerName: "Unique ID", type: "string", renderCell(params) {

      return (
        <Tooltip arrow title="Click to copy the certificate ID" componentsProps={{
          tooltip: {
            sx: {
              fontSize: 16,
            },
          },
        }}>
          <Box onClick={()=> copyToClipboard(params.row.uniqueNumber)} justifySelf={"center"} flex={1} flexDirection="column" display="flex" overflow="hidden">
            <Typography noWrap textOverflow={"ellipsis"}>{params.value}</Typography>
          </Box>
        </Tooltip>
      );
    },
  },
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
  {
    field: "favorite", width: 100, headerName: "", type: "boolean", renderCell(params) {
      const isFavorite = Math.random() > 0.5; // TODO: replace with actual data from localStorage
      return isFavorite ? <TurnedInNotIcon /> : <TurnedInIcon />
    },
  },
];

export default function QuickFilteringGrid() {


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


  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={query.data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={exerciseCols}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
