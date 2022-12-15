import { Paper } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled(Paper)`
  display: flex;

  padding: 1rem;

  > div {
    flex-grow: 1;
  }
`;

export const Styled = {
  Wrapper,
};
