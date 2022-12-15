/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TransactionFormTextField } from "ui/components/FormTextField/FormTextField";
import { Styled } from "./TransactionForm.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTransactionSchema, TransactionSchema } from "./schema";

interface TransactionFormProps {
  onFormSubmit: (formData: TransactionSchema) => void;
}
export const TransactionForm = ({ onFormSubmit }: TransactionFormProps): JSX.Element => {
  const methods = useForm<TransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset } = methods;

  const onSubmitHandler = (data: TransactionSchema): void => {
    onFormSubmit(data);
    console.log(data);
  };

  return (
    <Styled.Container>
      <Styled.FormTitle variant={"h5"}>Add a new transaction</Styled.FormTitle>
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
