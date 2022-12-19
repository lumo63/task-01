import axios from "axios";
import { transactionsUrl } from "api/common/consts";

const getDeleteUrl = (id: number) => `${transactionsUrl}/${id}`;

const deleter = async (url: string) => await axios.delete(url);

export const useDeleteTransaction = () => {
  return async (id: number) => {
    const deleteUrl = getDeleteUrl(id);

    return await deleter(deleteUrl);
  };
};
