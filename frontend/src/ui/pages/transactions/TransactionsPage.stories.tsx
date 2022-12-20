import { TransactionsPage } from "./TransactionsPage";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { rest } from "msw";
import { transactionsTableMocks } from "./components/TransactionsTable/TransactionsTable.mocks";
import { TransactionsAreDisplayedInATableRow } from "./components/TransactionsTable/TransactionsTable.stories";
import { UserCanFillTheForm } from "./components/TransactionForm/TransactionForm.stories";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { transactionsUrl } from "api/transactions/transactions";
import { expect } from "@storybook/jest";
import { useEffect } from "react";

type StoryType = ComponentStoryObj<typeof TransactionsPage>;
export default {
  component: TransactionsPage,
  parameters: {
    msw: {
      handlers: {
        defaults: [
          rest.delete(`${transactionsUrl}/*`, (req, res, ctx) => {
            return res(ctx.status(200, "OK"));
          }),
          rest.post(transactionsUrl, (req, res, ctx) => {
            return res(ctx.status(201, "Created"));
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
  parameters: {
    msw: {
      handlers: {
        transactions: rest.get(transactionsUrl, (req, res, ctx) => {
          return res(ctx.json([transactionsTableMocks.transactions[0]]));
        }),
      },
    },
  },
  play: async (context) => {
    // @ts-expect-error
    await TransactionsAreDisplayedInATableRow.play?.(context);
  },
};

export const UserCanAddATransactionThroughTheForm: StoryType = {
  parameters: {
    msw: {
      handlers: {
        transactions: [
          rest.get(transactionsUrl, (req, res, ctx) => {
            return res.once(ctx.json([]));
          }),
          rest.get(transactionsUrl, (req, res, ctx) => {
            return res(ctx.json([transactionsTableMocks.transactions[0]]));
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
