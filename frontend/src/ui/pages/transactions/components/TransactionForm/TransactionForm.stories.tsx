import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TransactionForm } from "./TransactionForm";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";

type StoryType = ComponentStoryObj<typeof TransactionForm>;
export default {
  component: TransactionForm,
} as ComponentMeta<typeof TransactionForm>;

export const Default: StoryType = {};

export const UserCanFillTheFormAndSubmit: StoryType = {
  args: {
    onFormSubmit: jest.fn(async () => true),
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const amountFormField = await canvas.findByLabelText("Amount");

    userEvent.type(amountFormField, "655.51");

    const accountNumberFormField = await canvas.findByLabelText("Account number");

    userEvent.type(accountNumberFormField, "10104415359647878000000000");

    const addressFormField = await canvas.findByLabelText("Address");

    userEvent.type(addressFormField, "715 Bennet Court, Brogan, Arizona, 9202");

    const descriptionFormField = await canvas.findByLabelText("Description");

    userEvent.type(descriptionFormField, "Irure ut cillum mollit proident voluptate veniam.");

    const submitButton = await canvas.findByText("Submit");

    userEvent.click(submitButton);

    await waitFor(() =>
      expect(context.args.onFormSubmit).toBeCalledWith({
        account: "10104415359647878000000000",
        address: "715 Bennet Court, Brogan, Arizona, 9202",
        amount: "655.51",
        description: "Irure ut cillum mollit proident voluptate veniam.",
      })
    );
  },
};

export const UserCanSeeValidationErrors: StoryType = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const amountFormField = await canvas.findByLabelText("Amount");

    userEvent.type(amountFormField, "-1");

    const accountNumberFormField = await canvas.findByLabelText("Account number");

    userEvent.type(accountNumberFormField, "test");

    const addressFormField = await canvas.findByLabelText("Address");

    userEvent.type(addressFormField, "");

    const descriptionFormField = await canvas.findByLabelText("Description");

    userEvent.type(descriptionFormField, "");

    const submitButton = await canvas.findByText("Submit");

    userEvent.click(submitButton);

    await waitFor(() => expect(context.args.onFormSubmit).not.toHaveBeenCalled());
  },
};

export const UserCanSeeThatAllFieldsAreRequired: StoryType = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const amountFormField = await canvas.findByLabelText("Amount");

    userEvent.click(amountFormField);

    const accountNumberFormField = await canvas.findByLabelText("Account number");

    userEvent.click(accountNumberFormField);

    const addressFormField = await canvas.findByLabelText("Address");

    userEvent.click(addressFormField);

    const descriptionFormField = await canvas.findByLabelText("Description");

    userEvent.click(descriptionFormField);

    const submitButton = await canvas.findByText("Submit");

    userEvent.click(submitButton);
    await waitFor(() => expect(context.args.onFormSubmit).not.toHaveBeenCalled());
  },
};

export const UserSeeSpacesAreValidated: StoryType = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const amountFormField = await canvas.findByLabelText("Amount");

    userEvent.type(amountFormField, " ");

    const accountNumberFormField = await canvas.findByLabelText("Account number");

    userEvent.type(accountNumberFormField, " ");

    const addressFormField = await canvas.findByLabelText("Address");

    userEvent.type(addressFormField, " ");

    const descriptionFormField = await canvas.findByLabelText("Description");

    userEvent.type(descriptionFormField, " ");

    const submitButton = await canvas.findByText("Submit");

    userEvent.click(submitButton);

    await waitFor(() => expect(context.args.onFormSubmit).not.toHaveBeenCalled());
  },
};

export const UserCanSeeSubmitSuccess: StoryType = {
  args: {
    onFormSubmit: jest.fn(async () => true),
  },
  play: async (context) => {
    await UserCanFillTheFormAndSubmit.play?.(context);

    const { findByTestId } = within(context.canvasElement);

    await findByTestId("transactions-alert-success");
  },
};

export const UserCanSeeSubmitError: StoryType = {
  args: {
    onFormSubmit: jest.fn(async () => false),
  },
  play: async (context) => {
    await UserCanFillTheFormAndSubmit.play?.(context);

    const { findByTestId } = within(context.canvasElement);

    await findByTestId("transactions-alert-error");
  },
};
