/* eslint-disable n/handle-callback-err */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "api/consts";
import { Transaction } from "types";

export const transactionsUrl = `${baseUrl}/transactions`;
const getDeleteUrl = (id: number) => `${transactionsUrl}/${id}`;

export const useTransactions = (page: number, rowsPerPage: number, filterValue: string | undefined) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () =>
      await axios
        .get<Transaction[]>(transactionsUrl, {
          params: {
            _page: page + 1,
            _limit: rowsPerPage,
            beneficiary_like: filterValue,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const postMutation = useMutation({
    mutationFn: async (transaction: Transaction) => await axios.post(transactionsUrl, transaction),
    onMutate: async (transaction: Transaction) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      const previousTransactions = queryClient.getQueryData<Transaction[]>(["transactions"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Transaction[]>(["transactions"], (oldTransactions) => [
        ...(oldTransactions ?? []),
        transaction,
      ]);

      // Return a context object with the snapshotted value
      return { previousTransactions };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData<Transaction[]>(["transactions"], context?.previousTransactions);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await axios.delete(getDeleteUrl(id)),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      const previousTransactions = queryClient.getQueryData(["transactions"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Transaction[]>(["transactions"], (old) => old!.filter((t) => t.id !== id));

      // Return a context object with the snapshotted value
      return { previousTransactions };
    },
  });

  const balance = (query.data ?? []).reduce((acc, transaction) => acc + transaction.amount, 0);

  return {
    query,
    balance,
    postMutation,
    deleteMutation,
  };
};
