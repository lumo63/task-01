import { TransactionsPage } from "./TransactionsPage";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

type StoryType = ComponentStoryObj<typeof TransactionsPage>;
export default {
  component: TransactionsPage,
} as ComponentMeta<typeof TransactionsPage>;

export const TransactionsAreFetched: StoryType = {
  args: {},
};
