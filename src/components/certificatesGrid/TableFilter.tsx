import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,

} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { certificatesColumnsDefinitions } from "./config"
import getCertificates from "../../services/getCertificates";
import { CertificateItem } from "@/types/CertificatesResponse";



export default function QuickFilteringGrid() {

  const query = useQuery<CertificateItem[]>({
    queryKey: ["posts"],
    queryFn: getCertificates,
    initialData: [],
  });

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        rows={query.data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={certificatesColumnsDefinitions}
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
