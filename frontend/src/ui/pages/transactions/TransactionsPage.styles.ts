import { Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

const BalanceAndFilterContainer = styled(Box)`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

const Wrapper = styled(Paper)`
  padding: 0 25%;
`;

const TopWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const Styled = {
  BalanceAndFilterContainer,
  Wrapper,
  TopWrapper,
};
