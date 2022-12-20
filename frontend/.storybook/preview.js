// noinspection ES6PreferShortImport

import { SWRConfig } from "swr";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/api/queryClient";

// Initialize MSW
initialize();
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
  mswDecorator,
];
