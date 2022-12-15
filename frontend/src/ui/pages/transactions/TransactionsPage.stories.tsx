import { TransactionsPage } from "./TransactionsPage";
import { ComponentMeta } from "@storybook/react";

export default {
  component: TransactionsPage,
  decorators: [(Story) => <div style={{ height: "100vh", display: "flex" }}>{<Story />}</div>],
} as ComponentMeta<any>;

export const Default = {};
