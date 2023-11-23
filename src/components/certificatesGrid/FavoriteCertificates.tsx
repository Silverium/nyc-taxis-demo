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
import store from "../../store/globalStore";
const filterFavoriteCertificates = (certificates: CertificateItem[]) => {
  try {
    const favoriteCertificates = store.getState().favoriteCertificates;
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
        sx={{
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
