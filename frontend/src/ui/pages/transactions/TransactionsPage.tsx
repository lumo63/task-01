import { Box, Grid } from "@mui/material";
import { Navbar } from "./components/Navbar/Navbar";
import { TransactionForm } from "./components/TransactionForm/TransactionForm";
import { Balance } from "./components/Balance/Balance";
import { Filter } from "./components/Filter/Filter";
import { TransactionsTable } from "./components/TransactionsTable/TransactionsTable";

export const TransactionsPage = () => {
  return (
    <Box sx={{ background: "#E7EBF0" }}>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid marginLeft={0.5} marginRight={2} spacing={2} item container>
          <Grid spacing={2} direction={"row-reverse"} container item xs={12}>
            <Grid item xs={12} md={8}>
              <TransactionForm onFormSubmit={async () => true} />
            </Grid>
            <Grid spacing={1} container item xs={12} md={4}>
              <Grid item xs={12}>
                <Balance balance={1000} />
              </Grid>
              <Grid display={"flex"} alignItems={"flex-end"} item xs={12}>
                <Filter onFilterChange={() => {}} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TransactionsTable isLoading={false} transactions={[]} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
