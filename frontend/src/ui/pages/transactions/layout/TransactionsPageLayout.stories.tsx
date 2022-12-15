import { TransactionsPageLayout } from "./TransactionsPageLayout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { transactionsTableMocks } from "ui/pages/transactions/components/TransactionsTable/TransactionsTable.mocks";

type StoryType = ComponentStoryObj<typeof TransactionsPageLayout>;
export default {
  component: TransactionsPageLayout,
  args: {
    balance: 1421,
  },
} as ComponentMeta<typeof TransactionsPageLayout>;

export const TransactionsDidLoad: StoryType = {
  args: {
    transactions: transactionsTableMocks.transactions,
    isLoading: false,
  },
};

export const TransactionsLoading: StoryType = {
  args: {
    balance: 0,
    transactions: [],
    isLoading: true,
  },
};
