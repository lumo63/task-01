import { baseUrl } from "api/common/consts";
import { Transaction } from "types";
import axios from "axios";

export const transactionsUrl = `${baseUrl}/transactions`;

export const post = async (transaction: Transaction) => await axios.post(transactionsUrl, transaction);

export const transactionApi = {
  post,
};
