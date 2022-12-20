import { TransactionsPage } from "./TransactionsPage";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { rest } from "msw";
import { transactionsTableMocks } from "./components/TransactionsTable/TransactionsTable.mocks";
import { TransactionsAreDisplayedInATableRow } from "./components/TransactionsTable/TransactionsTable.stories";
import { UserCanFillTheForm } from "./components/TransactionForm/TransactionForm.stories";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { useEffect } from "react";
import { transactionsUrl } from "./hooks/useTransactions";

type StoryType = ComponentStoryObj<typeof TransactionsPage>;
export default {
  component: TransactionsPage,
  parameters: {
    msw: {
      handlers: {
        others: [
          rest.delete(`${transactionsUrl}/*`, (req, res, ctx) => {
            return res(ctx.status(200, "OK"));
          }),
          rest.post(transactionsUrl, (req, res, ctx) => {
            return res(ctx.status(201, "Created"));
          }),
        ],
        getters: [
          rest.get(transactionsUrl, (req, res, ctx) => {
            return res(ctx.json([transactionsTableMocks.transactions[0]]));
          }),
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => window.location.reload();
      }, []);

      return <Story />;
    },
  ],
} as ComponentMeta<typeof TransactionsPage>;

export const UserCanFetchTransactions: StoryType = {
  play: async (context) => {
    // @ts-expect-error
    await TransactionsAreDisplayedInATableRow.play?.(context);
  },
};

export const UserCanAddATransactionThroughTheForm: StoryType = {
  parameters: {
    msw: {
      handlers: {
        getters: [
          rest.get(transactionsUrl, (req, res, ctx) => {
            return res.once(ctx.json([]));
          }),
        ],
      },
    },
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await canvas.findByText("No transactions have been found");

    await UserCanFillTheForm.play?.(context);

    const submitButton = await canvas.findByText("Submit");
    await waitFor(async () => expect(submitButton).toBeEnabled());

    userEvent.click(submitButton);

    await canvas.findByText("Transaction has been saved.");
  },
};

export const UserCanDeleteATransaction: StoryType = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const deleteButton = await canvas.findByText("Delete");

    userEvent.click(deleteButton);
    await canvas.findByText("No transactions have been found");
  },
};
