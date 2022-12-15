import { object, string, TypeOf, z } from "zod";
import { positiveFloatRegex, positiveIntegerRegex } from "consts/regexs";

export type TransactionSchema = TypeOf<typeof addTransactionSchema>;

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

export const addTransactionSchema = object({
  amount: string().nonempty("Amount must be provided").regex(positiveFloatRegex, "Amount must be a positive value"),
  account: string().nonempty("Account must be provided").regex(positiveIntegerRegex, "Account must have numbers only"),
  address: z.preprocess(trimString, z.string().nonempty("Address must be provided")),
  description: z.preprocess(trimString, z.string().nonempty("Description must be provided")),
});
