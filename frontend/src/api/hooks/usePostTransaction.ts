import axios from "axios";
import { transactionsUrl } from "api/common/consts";
import useSWRMutation from "swr/mutation";

const sendTransaction = async (url: string, { arg }: { arg: unknown }) => {
  return await axios.post(url, arg);
};

export const usePostTransaction = () => {
  const { trigger } = useSWRMutation(transactionsUrl, sendTransaction);

  return { trigger };
};
