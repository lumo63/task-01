import useSWR from "swr";
import { baseUrl } from "api/common/consts";
import { Transaction } from "types";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

export const useTransactions = (page: number, limit: number, filterValue: string) => {
  const { data, isLoading } = useSWR<Transaction[]>(
    `${baseUrl}/transactions?_page=${page}&_limit=${limit}${filterValue ? `&beneficiary_like=${filterValue}` : ""}`,
    fetcher
  );

  return {
    transactions: data,
    isLoading,
  };
};
