import { Transaction } from "types";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";

export interface TransactionTableBodyProps {
  transactions?: Transaction[];
  onTransactionDelete: (id: number) => Promise<void>;
}
export const TransactionTableBody = ({ transactions, onTransactionDelete }: TransactionTableBodyProps): JSX.Element => {
  return (
    <TableBody data-testid={"transaction-table-body"}>
      {transactions?.length ? (
        transactions?.map((row) => (
          <TableRow data-testid={"transaction-table-body-row"} key={row.date}>
            <TableCell align="right">{row.id}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">{row.beneficiary}</TableCell>
            <TableCell align="right">{row.account}</TableCell>
            <TableCell align="right">{row.address}</TableCell>
            <TableCell align="right">{new Date(row.date).toLocaleString("pl-PL")}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">
              <Button onClick={async () => await onTransactionDelete(row.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <NoDataTableRow />
      )}
    </TableBody>
  );
};

const NoDataTableRow = () => (
  <TableRow>
    <TableCell colSpan={8}>No transactions have been found</TableCell>
  </TableRow>
);
