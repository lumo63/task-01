import React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { TransactionsPage } from "./ui/pages/transactions/TransactionsPage";
import { queryClient } from "./api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionsPage />;
    </QueryClientProvider>
  );
}

export default App;
