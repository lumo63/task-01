import { TableCell, TableHead, TableRow } from "@mui/material";

export const TransactionTableHead = (): JSX.Element => {
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
        <TableCell align="center">Action</TableCell>
      </TableRow>
    </TableHead>
  );
};
