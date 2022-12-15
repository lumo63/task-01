import { Filter } from "./Filter";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";

type StoryType = ComponentStoryObj<typeof Filter>;
export default {
  component: Filter,
} as ComponentMeta<typeof Filter>;

export const EmptyField: StoryType = {};

export const UserCanFilterByBeneficiaryField: StoryType = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const filterInput = await canvas.findByLabelText("Filter by beneficiary field");

    userEvent.type(filterInput, "test filter value");

    await waitFor(() => expect(context.args.onFilterChange).toHaveBeenCalledTimes(1));
  },
};
