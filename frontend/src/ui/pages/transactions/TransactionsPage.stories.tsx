import { TransactionsPage } from "./TransactionsPage";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

type StoryType = ComponentStoryObj<typeof TransactionsPage>;
export default {
  component: TransactionsPage,
  args: {
    balance: 1421,
  },
} as ComponentMeta<typeof TransactionsPage>;

export const TransactionsDidLoad: StoryType = {
  args: {},
};

export const TransactionsLoading: StoryType = {
  args: {
    balance: 0,
  },
};
