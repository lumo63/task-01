import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Transaction } from "types/types";
import { useState } from "react";

interface TransactionTableProps extends BodyProps {
  isLoading: boolean;
}
export const TransactionsTable = ({ transactions }: TransactionTableProps): JSX.Element | null => {
  const [page, setPage] = useState(20);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={"transactions table"}>
          <Head />
          <Body transactions={transactions} />
        </Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 40]}
              rowsPerPage={page}
              count={transactions.length}
              page={page}
              onPageChange={(_, pageNumber) => setPage(pageNumber)}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
    </>
  );
};

const Head = (): JSX.Element => {
  return (
    <TableHead>
      <TableRow data-testid={"transaction-table-head"}>
        <TableCell>ID</TableCell>
        <TableCell align="right">Amount</TableCell>
        <TableCell align="right">Beneficiary</TableCell>
        <TableCell align="right">Account number</TableCell>
        <TableCell align="right">Address</TableCell>
        <TableCell align="right">Date</TableCell>
        <TableCell align="right">Description</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface BodyProps {
  transactions: Transaction[];
}
const Body = ({ transactions }: BodyProps): JSX.Element => {
  return (
    <>
      {transactions.map((row) => (
        <TableRow data-testid={"transaction-table-row"} key={row.id}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell align="right">{row.amount}</TableCell>
          <TableCell align="right">{row.beneficiary}</TableCell>
          <TableCell align="right">{row.account}</TableCell>
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
          <TableCell align="right">{row.description}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
