import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableRow,
} from "@mui/material";
import { Transaction } from "types/types";
import { useState } from "react";

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
    <TableBody>
      {transactions.map((row) => (
        <TableRow data-testid={"transaction-table-row"} key={row.date}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell align="right">{row.amount}</TableCell>
          <TableCell align="right">{row.beneficiary}</TableCell>
          <TableCell align="right">{row.account}</TableCell>
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{new Date(row.date).toLocaleString("pl-PL")}</TableCell>
          <TableCell align="right">{row.description}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

interface TransactionTableProps extends BodyProps {
  isLoading: boolean;
}
export const TransactionsTable = ({ transactions }: TransactionTableProps): JSX.Element | null => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const onPageChangeHandler: TablePaginationProps["onPageChange"] = (_, pageNumber) => setPage(pageNumber);
  const onRowsPerPageChangeHandler: TablePaginationProps["onRowsPerPageChange"] = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={"transactions table"}>
          <Head />
          <Body transactions={transactions} />
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[20, 40]}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChangeHandler}
                count={transactions.length}
                page={page}
                onPageChange={onPageChangeHandler}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
