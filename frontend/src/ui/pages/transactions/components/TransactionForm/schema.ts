import { object, string, TypeOf } from "zod";
import { positiveFloatRegex, positiveIntegerRegex } from "consts/regexs";

export type TransactionSchema = TypeOf<typeof addTransactionSchema>;

export const addTransactionSchema = object({
  amount: string().nonempty("Amount must be provided").regex(positiveFloatRegex, "Amount must be a positive value"),
  account: string().nonempty("Account must be provided").regex(positiveIntegerRegex, "Account must have numbers only"),
  address: string().nonempty("Address must be provided"),
  description: string().nonempty("Description must be provided"),
});
