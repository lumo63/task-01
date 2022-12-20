import { Alert } from "@mui/material";
import { SubmitState } from "types";

export interface TransactionAlertProps {
  alertType: SubmitState;
}
export const TransactionAlert = ({ alertType }: TransactionAlertProps) => {
  const alertTexts: Record<SubmitState, string> = {
    error: "There was an error while trying to save a transaction.",
    success: "Transaction has been saved.",
  };

  return (
    <Alert data-testid={`transactions-alert-${alertType}`} severity={alertType}>
      {alertTexts[alertType]}
    </Alert>
  );
};
