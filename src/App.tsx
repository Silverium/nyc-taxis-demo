import * as React from "react";
import "./styles.css";
import { BrowserRouter, Route, Routes, Link as RouterLink } from 'react-router-dom';
import TableFilter from "./components/certificatesGrid/TableFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Link, ListItemText, Typography } from "@mui/material";
const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Box className="App">

          <Routes>
            <Route path="/" Component={() => {
              return <>
                <Typography variant="h2" component="h1">
                  Carbon Certificates app
                </Typography>
                <Typography variant="h3" component="h1">
                  Tech stack used
                </Typography>

                <List>
                  <ListItem alignItems="center">
                    <ListItemText sx={{ textAlign: "center" }}>
                      <Link href="https://mui.com/components/data-grid/">
                        MUI Data Grid
                      </Link>

                    </ListItemText>
                  </ListItem >
                  <ListItem alignItems="center">
                    <ListItemText sx={{ textAlign: "center" }}>
                      <Link href="https://react-query.tanstack.com/">
                        React Query
                      </Link>
                    </ListItemText>
                  </ListItem>
                </List>
                <Typography variant="h3" component="h1">
                  Features required
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText sx={{ fontSize: "20px", color: "GrayText" }}>
                      <Link component={RouterLink} to="/certificates">"Certificates"</Link> page - the list of available Carbon certificates
                    </ListItemText>
                    <List>
                      <ListItem >
                        <ListItemText >
                          Copying the certificate ID to the clipboard
                        </ListItemText>
                      </ListItem >
                      <ListItem >
                        <ListItemText >
                          Saving the certificate as a favourite (client-side only)
                        </ListItemText>
                      </ListItem >
                    </List>
                  </ListItem >
                  <ListItem>
                    <ListItemText sx={{ fontSize: "20px", color: "GrayText" }}>
                    <Link component={RouterLink} to="/favorites">"Favorites"</Link> page - the list of saved Carbon Certificates
                    </ListItemText>
                    <List>
                      <ListItem >
                        <ListItemText >
                          Same page as "Certificates" with a possibility to remove the certificate from favourites
                        </ListItemText>
                      </ListItem >
                    </List>
                  </ListItem >


                </List>
              </>
            }} />
            <Route path="/certificates" Component={TableFilter} />
            <Route path="/favorites" Component={TableFilter} />
          </Routes>
        </Box>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
