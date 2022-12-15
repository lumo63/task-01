/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TransactionFormTextField } from "ui/components/FormTextField/FormTextField";
import { Styled } from "./TransactionForm.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTransactionSchema, TransactionSchema } from "./schema";
import { useState } from "react";
import { TransactionAlert } from "./components/TransactionAlert";
import { SubmitState } from "types";

interface TransactionFormProps {
  onFormSubmit: (formData: TransactionSchema) => Promise<boolean>;
}
export const TransactionForm = ({ onFormSubmit }: TransactionFormProps): JSX.Element => {
  const [submitState, setSubmitState] = useState<SubmitState>("success");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const methods = useForm<TransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset } = methods;

  const onSubmitHandler = async (data: TransactionSchema) => {
    const isFormSubmitSuccess = await onFormSubmit(data);

    setSubmitState(isFormSubmitSuccess ? "success" : "error");
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  return (
    <Styled.Container>
      <Typography variant={"h5"}>Add a new transaction</Typography>
      <Styled.AlertWrapper in={isAlertVisible}>
        <TransactionAlert alertType={submitState} />
      </Styled.AlertWrapper>
      <Styled.Form>
        <FormProvider {...methods}>
          <TransactionFormTextField type={"number"} name={"amount"} label={"Amount"} />
          <TransactionFormTextField name={"account"} label={"Account number"} />
          <TransactionFormTextField name={"address"} label={"Address"} />
          <TransactionFormTextField name={"description"} label={"Description"} />
          <Styled.FormButtonsContainer>
            <Button onClick={handleSubmit(onSubmitHandler)}>Submit</Button>
            <Button onClick={() => reset()} variant={"outlined"}>
              Reset
            </Button>
          </Styled.FormButtonsContainer>
        </FormProvider>
      </Styled.Form>
    </Styled.Container>
  );
};
