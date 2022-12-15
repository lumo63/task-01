import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { TransactionSchema } from "ui/pages/transactions/components/TransactionForm/schema";

export type TransactionFormTextFieldProps = {
  name: keyof TransactionSchema;
} & TextFieldProps;

export const TransactionFormTextField = ({ name, ...otherProps }: TransactionFormTextFieldProps): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TransactionSchema>();

  return (
    <Controller
      defaultValue={""}
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={!(errors[name] == null)}
          helperText={errors[name]?.message ?? ""}
          variant={"standard"}
        />
      )}
    />
  );
};
