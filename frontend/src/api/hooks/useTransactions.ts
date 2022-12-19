import useSWR from "swr";
import { Transaction } from "types";
import axios from "axios";
import { transactionsUrl } from "api/transactions/transactions";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

export const useTransactions = (page: number, limit: number, filterValue: string) => {
  const { data, isLoading, mutate } = useSWR<Transaction[]>(
    `${transactionsUrl}?_page=${page + 1}&_limit=${limit}${filterValue ? `&beneficiary_like=${filterValue}` : ""}`,
    fetcher
  );

  const balance = (data ?? []).reduce((acc, transaction) => acc + transaction.amount, 0);

  return {
    transactions: data,
    isLoading,
    balance,
    mutate,
  };
};
