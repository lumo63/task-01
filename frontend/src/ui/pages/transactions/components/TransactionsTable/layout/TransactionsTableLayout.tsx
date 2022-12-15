import { Box, CircularProgress, Paper, Table, TableContainer } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  TransactionTableBody,
  TransactionTableBodyProps,
} from "ui/pages/transactions/components/TransactionsTable/layout/components/TransactionTableBody/TransactionTableBody";
import { TransactionTableHead } from "./components/TransactionTableHead/TransactionTableHead";

export interface TransactionTableProps extends PropsWithChildren<TransactionTableBodyProps> {
  isLoading?: boolean;
}
export const TransactionsTableLayout = ({
  transactions,
  isLoading,
  children,
}: TransactionTableProps): JSX.Element | null => (
  <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }} aria-label={"transactions table"}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <TransactionTableHead />
            <TransactionTableBody transactions={transactions} />
            {children}
          </>
        )}
      </Table>
    </TableContainer>
  </>
);

const Loader = () => (
  <Box minHeight={320} display={"flex"} alignItems={"center"} justifyContent={"center"}>
    <CircularProgress />
  </Box>
);
