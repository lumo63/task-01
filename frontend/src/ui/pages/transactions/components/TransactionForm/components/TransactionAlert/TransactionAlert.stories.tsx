import { TransactionAlert } from "./TransactionAlert";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

type StoryType = ComponentStoryObj<typeof TransactionAlert>;
export default {
  component: TransactionAlert,
} as ComponentMeta<typeof TransactionAlert>;

export const Success: StoryType = {
  args: {
    alertType: "success",
  },
};

export const Error: StoryType = {
  args: {
    alertType: "error",
  },
};
