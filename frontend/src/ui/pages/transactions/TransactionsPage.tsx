import { Box, Grid, TableFooter, TablePagination, TablePaginationProps, TableRow } from "@mui/material";
import { Filter } from "ui/pages/transactions/components/Filter/Filter";
import { TransactionForm } from "ui/pages/transactions/components/TransactionForm/TransactionForm";
import { Navbar } from "ui/pages/transactions/components/Navbar/Navbar";
import { Balance } from "ui/pages/transactions/components/Balance/Balance";
import { TransactionsTableLayout } from "./components/TransactionsTable/layout/TransactionsTableLayout";
import { useState } from "react";
import { useTransactions } from "api/hooks/useTransactions";

type onPageChangeHandler = TablePaginationProps["onPageChange"];
type onRowsPerPageChangeHandler = TablePaginationProps["onRowsPerPageChange"];

export const TransactionsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterValue, setFilterValue] = useState("");

  const { transactions, isLoading, balance } = useTransactions(page, rowsPerPage, filterValue);

  const onPageChangeHandler: onPageChangeHandler = (_, pageNumber) => setPage(pageNumber);
  const onRowsPerPageChangeHandler: onRowsPerPageChangeHandler = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onFormSubmit = async () => {
    return true;
  };

  return (
    <Box sx={{ background: "#E7EBF0" }}>
      <Grid container>
        <Grid marginBottom={1} item xs={12}>
          <Navbar />
        </Grid>
        <Grid rowSpacing={2} item container>
          <Grid paddingLeft={1} paddingRight={1} spacing={1} direction={"row-reverse"} container item xs={12}>
            <Grid item xs={12} md={8}>
              <TransactionForm onFormSubmit={onFormSubmit} />
            </Grid>
            <Grid spacing={1} container item justifyContent={"space-between"} xs={12} md={4}>
              <Grid item xs={12}>
                <Balance balance={balance} />
              </Grid>
              <Grid display={"flex"} alignItems={"flex-end"} item xs={12}>
                <Filter onFilterChange={setFilterValue} />
              </Grid>
            </Grid>
          </Grid>
          <Grid marginBottom={1} paddingLeft={1} paddingRight={1} item xs={12}>
            <TransactionsTableLayout transactions={transactions} isLoading={isLoading}>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[20, 40]}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={onRowsPerPageChangeHandler}
                    count={transactions?.length ?? 0}
                    page={page}
                    onPageChange={onPageChangeHandler}
                  />
                </TableRow>
              </TableFooter>
            </TransactionsTableLayout>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
