import * as React from "react";
import "./styles.css";
import TableFilter from "./components/TableFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <TableFilter />
      </div>
    </QueryClientProvider>
  );
}
