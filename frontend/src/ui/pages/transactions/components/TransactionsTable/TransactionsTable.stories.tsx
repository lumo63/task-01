import { TransactionsTable } from "./TransactionsTable";
import { ComponentStoryObj } from "@storybook/react";
import { transactionsTableMocks } from "./TransactionsTable.mocks";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

type StoryType = ComponentStoryObj<typeof TransactionsTable>;
export default {
  component: TransactionsTable,
  args: {
    isLoading: false,
  },
};

export const Default: StoryType = {
  args: {
    transactions: transactionsTableMocks.transactions,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await canvas.findByTestId("transaction-table-head");

    const rows = await canvas.findAllByTestId("transaction-table-row");

    expect(rows).toHaveLength(2);
  },
};

export const OneRow: StoryType = {
  args: {
    transactions: [transactionsTableMocks.transactions[0]],
  },
  play: async (context) => {
    const expectedCellValues = [
      0,
      -2008.75,
      "Callie Nieves",
      "PL10104092290785174000000000",
      "185 Berkeley Place, Brady, West Virginia, 7409",
      "15.12.2015 01:05:42",
      "Amet amet qui proident sint esse adipisicing amet.",
    ];

    const canvas = within(context.canvasElement);

    const row = await canvas.findByTestId("transaction-table-row");

    Array.from(row.children).forEach((cell, index) => {
      expect(cell).toHaveTextContent(String(expectedCellValues[index]));
    });
  },
};

export const Loading: StoryType = {
  args: {
    isLoading: true,
  },
};

export const Empty: StoryType = {
  args: {
    transactions: [],
  },
};
