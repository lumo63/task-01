import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { Balance } from "./Balance";
import { expect } from "@storybook/jest";

type StoryType = ComponentStoryObj<typeof Balance>;
export default {
  component: Balance,
} as ComponentMeta<typeof Balance>;

export const Positive: StoryType = {
  args: {
    balance: 1000,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const balance = await canvas.findByTestId("transactions-balance-green");

    expect(balance).toHaveTextContent("Your balance is: 1000");
  },
};

export const Zero: StoryType = {
  args: {
    balance: 0,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const balance = await canvas.findByTestId("transactions-balance-gray");

    expect(balance).toHaveTextContent("Your balance is: 0");
  },
};

export const Negative: StoryType = {
  args: {
    balance: -1000,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const balance = await canvas.findByTestId("transactions-balance-red");

    expect(balance).toHaveTextContent("Your balance is: -1000");
  },
};
