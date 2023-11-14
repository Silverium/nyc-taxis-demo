import * as React from "react";
import "./styles.css";
import TableFilter from "./components/TableFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, ListItemText } from "@mui/material";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Coding exercise</h1>
        <h2>Tech stack used</h2>
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
        <h2>Instructions</h2>
        <p>
          The goal of this exercise is to create a data grid that displays data
          from the JSONPlaceholder API. The data grid should be able to filter
          by title, to be able to edit fields, and to highlight (with italic) the title of the rows where the
          user ID is a prime number.
        </p>
        <TableFilter />
      </div>
    </QueryClientProvider>
  );
}
