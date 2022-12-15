import { Transaction } from "types";
import { TableBody, TableCell, TableRow } from "@mui/material";

export interface TransactionTableBodyProps {
  transactions?: Transaction[];
}
export const TransactionTableBody = ({ transactions }: TransactionTableBodyProps): JSX.Element => {
  return (
    <TableBody>
      {transactions?.length ? (
        transactions?.map((row) => (
          <TableRow data-testid={"transaction-table-row"} key={row.date}>
            <TableCell align="right">{row.id}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">{row.beneficiary}</TableCell>
            <TableCell align="right">{row.account}</TableCell>
            <TableCell align="right">{row.address}</TableCell>
            <TableCell align="right">{new Date(row.date).toLocaleString("pl-PL")}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
          </TableRow>
        ))
      ) : (
        <NoDataTableRow />
      )}
      {}
    </TableBody>
  );
};

const NoDataTableRow = () => (
  <TableRow>
    <TableCell colSpan={7}>No transactions have been found</TableCell>
  </TableRow>
);
