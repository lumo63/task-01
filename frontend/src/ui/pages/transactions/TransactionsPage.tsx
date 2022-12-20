import { Box, Grid, Snackbar, TableFooter, TablePagination, TablePaginationProps, TableRow } from "@mui/material";
import { Filter } from "ui/pages/transactions/components/Filter/Filter";
import { TransactionForm } from "ui/pages/transactions/components/TransactionForm/TransactionForm";
import { Navbar } from "ui/pages/transactions/components/Navbar/Navbar";
import { Balance } from "ui/pages/transactions/components/Balance/Balance";
import { TransactionsTable } from "./components/TransactionsTable/TransactionsTable";
import { useState } from "react";
import { Transaction } from "types";
import { TransactionSchema } from "./components/TransactionForm/schema";
import { common } from "common/common";
import { useTransactions } from "./hooks/useTransactions";

type onPageChangeHandler = TablePaginationProps["onPageChange"];
type onRowsPerPageChangeHandler = TablePaginationProps["onRowsPerPageChange"];

export const TransactionsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const [snackbarText, setSnackbarText] = useState<string>("");

  const { query, balance, deleteMutation, postMutation } = useTransactions(page, rowsPerPage, filterValue);
  const onPageChangeHandler: onPageChangeHandler = (_, pageNumber) => setPage(pageNumber);
  const onRowsPerPageChangeHandler: onRowsPerPageChangeHandler = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onFormSubmit = async (data: TransactionSchema) => {
    try {
      const transactionToPost: Transaction = {
        id: common.getRandomNumber(),
        amount: Number(data.amount),
        beneficiary: "Unknown",
        account: data.account,
        address: data.address,
        date: new Date().toISOString(),
        description: data.description,
      };

      const res = await postMutation.mutateAsync(transactionToPost);

      return res?.statusText === "Created";
    } catch (e) {
      return false;
    }
  };

  const onTransactionDelete = async (id: number) => {
    const deleteResult = await deleteMutation.mutateAsync(id);

    if (deleteResult.statusText === "OK") {
      setSnackbarText("Transaction deleted");
    }
  };

  const onSnackbarClose = () => {
    setSnackbarText("");
  };

  const onFilterChangeHandler = (filterValue: string) => {
    setFilterValue(filterValue === "" ? undefined : filterValue);
    setPage(0);
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
              <TransactionForm isSubmitDisabled={query.isLoading} onFormSubmit={onFormSubmit} />
            </Grid>
            <Grid spacing={1} container item justifyContent={"space-between"} xs={12} md={4}>
              <Grid item xs={12}>
                <Balance balance={balance} />
              </Grid>
              <Grid display={"flex"} alignItems={"flex-end"} item xs={12}>
                <Filter onFilterChange={onFilterChangeHandler} />
              </Grid>
            </Grid>
          </Grid>
          <Grid marginBottom={1} paddingLeft={1} paddingRight={1} item xs={12}>
            <TransactionsTable
              transactions={query.data}
              isLoading={query.isLoading}
              onTransactionDelete={onTransactionDelete}
            >
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[20, 40]}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={onRowsPerPageChangeHandler}
                    count={-1}
                    page={page}
                    onPageChange={onPageChangeHandler}
                  />
                </TableRow>
              </TableFooter>
            </TransactionsTable>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={!!snackbarText}
        onClose={onSnackbarClose}
        autoHideDuration={5000}
        message={snackbarText}
      />
    </Box>
  );
};
