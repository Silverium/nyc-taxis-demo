import * as React from "react";
import "./styles.css";
import TableFilter from "./components/TableFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Coding exercise</h1>
        <h2>Tech stack used</h2>
        <List>
          <ListItem alignItems="center">
            <a href="https://mui.com/components/data-grid/">
              MUI Data Grid
            </a>
          </ListItem >
          <ListItem alignItems="center">
            <a href="https://react-query.tanstack.com/">
              React Query
            </a>
          </ListItem>
          <ListItem alignItems="center">
            <a href="https://jsonplaceholder.typicode.com/">
              JSONPlaceholder
            </a>
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
