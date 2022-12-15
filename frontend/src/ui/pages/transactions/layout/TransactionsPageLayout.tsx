import { Box, Grid } from "@mui/material";
import { Filter, FilterProps } from "ui/pages/transactions/components/Filter/Filter";
import {
  TransactionForm,
  TransactionFormProps,
} from "ui/pages/transactions/components/TransactionForm/TransactionForm";
import {
  TransactionsTable,
  TransactionTableProps,
} from "ui/pages/transactions/components/TransactionsTable/TransactionsTable";
import { Navbar } from "ui/pages/transactions/components/Navbar/Navbar";
import { Balance, BalanceProps } from "ui/pages/transactions/components/Balance/Balance";

type TransactionsPageLayoutProps = TransactionFormProps & BalanceProps & FilterProps & TransactionTableProps;

export const TransactionsPageLayout = ({
  transactions,
  onFilterChange,
  onFormSubmit,
  isLoading,
  balance,
}: TransactionsPageLayoutProps) => {
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
                <Filter onFilterChange={onFilterChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid marginBottom={1} paddingLeft={1} paddingRight={1} item xs={12}>
            <TransactionsTable isLoading={isLoading} transactions={transactions} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
