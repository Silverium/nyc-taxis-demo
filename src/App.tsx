import * as React from "react";
import "./styles.css";
import TableFilter from "./components/certificatesGrid/TableFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Link, ListItemText, Typography } from "@mui/material";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box className="App">
        <Typography variant="h2" component="h1">
          Coding exercise
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
          <ListItem alignItems="center">
            <ListItemText sx={{ textAlign: "center" }}>
              <Link href="https://jsonplaceholder.typicode.com/">
                JSONPlaceholder
              </Link>
            </ListItemText>
          </ListItem>
        </List>
        <Typography variant="h3" component="h1">
          Instructions
        </Typography>
        <Typography>
          The goal of this exercise is to create a data grid that displays data
          from the JSONPlaceholder API. The data grid should be able to filter
          by title, to be able to edit fields, and to highlight (with italic) the title of the rows where the
          user ID is a prime number.
        </Typography>
        <TableFilter />
      </Box>
    </QueryClientProvider>
  );
}
