import { Typography } from "@mui/material";

type BalanceColor = "green" | "gray" | "red";

interface BalanceProps {
  balance: number;
}

export const Balance = ({ balance }: BalanceProps): JSX.Element => {
  const getBalanceColor = (): BalanceColor => {
    if (balance > 0) {
      return "green";
    } else if (balance === 0) {
      return "gray";
    } else {
      return "red";
    }
  };

  const balanceColor = getBalanceColor();
  return (
    <Typography data-testid={`transactions-balance-${balanceColor}`} color={balanceColor} variant={"h6"}>
      Your balance is: {balance}
    </Typography>
  );
};
