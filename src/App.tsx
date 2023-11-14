import * as React from "react";
import "./styles.css";
import TableFilter from "./components/TableFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Coding exercise</h1>
        <h2>Tech stack used</h2>
        <ul>
          <li>
            <a href="https://mui.com/components/data-grid/">
              MUI Data Grid
            </a>
          </li>
          <li>
            <a href="https://react-query.tanstack.com/">
              React Query
            </a>
          </li>
          <li>
            <a href="https://jsonplaceholder.typicode.com/">
              JSONPlaceholder
            </a>
          </li>
        </ul>
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
