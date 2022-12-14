/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TransactionFormTextField } from "ui/components/FormTextField/FormTextField";
import { Styled } from "./TransactionForm.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTransactionSchema, TransactionSchema } from "./schema";
import { useEffect, useRef, useState } from "react";
import { TransactionAlert } from "./components/TransactionAlert/TransactionAlert";
import { SubmitState } from "types";

export interface TransactionFormProps {
  onFormSubmit: (formData: TransactionSchema) => Promise<boolean>;
  isSubmitDisabled: boolean;
}
export const TransactionForm = ({ onFormSubmit, isSubmitDisabled }: TransactionFormProps): JSX.Element => {
  const [submitState, setSubmitState] = useState<SubmitState>("success");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const methods = useForm<TransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const onSubmitHandler = async (data: TransactionSchema) => {
    const isFormSubmitSuccess = await onFormSubmit(data);

    setSubmitState(isFormSubmitSuccess ? "success" : "error");
    setIsAlertVisible(true);

    if (isFormSubmitSuccess) {
      reset();
    }

    timeoutRef.current = setTimeout(() => {
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
            <Button disabled={isSubmitDisabled} onClick={handleSubmit(onSubmitHandler)}>
              Submit
            </Button>
            <Button onClick={() => reset()} variant={"outlined"}>
              Reset
            </Button>
          </Styled.FormButtonsContainer>
        </FormProvider>
      </Styled.Form>
    </Styled.Container>
  );
};
