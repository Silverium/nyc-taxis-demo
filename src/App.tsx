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
        <TableFilter />
      </div>
    </QueryClientProvider>
  );
}
