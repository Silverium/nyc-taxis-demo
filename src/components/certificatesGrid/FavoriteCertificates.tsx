import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,

} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { certificatesColumnsDefinitions } from "./config"
import getCertificates from "../../services/getCertificates";
import { CertificateItem } from "../../types/CertificatesResponse";
const filterFavoriteCertificates = (certificates: CertificateItem[]) => {
  try { 
    const favoriteCertificates = JSON.parse(localStorage.getItem('favoriteCertificates') || '{}');
    return certificates.filter(certificate => favoriteCertificates[certificate.uniqueNumber]);
  } catch (error) {
    console.error(error);
    return certificates;
  }
}



export default function QuickFilteringGrid() {

  const query = useQuery<CertificateItem[]>({
    queryKey: ["posts"],
    queryFn: getCertificates,
    select: filterFavoriteCertificates,
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
