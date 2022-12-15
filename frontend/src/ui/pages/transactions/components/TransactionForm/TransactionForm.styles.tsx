import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin: 8px 0;

  > div {
    margin-bottom: 8px;
  }
`;

const FormButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin-top: 12px;

  button:nth-child(1) {
    margin-right: 4px;
  }
`;

const FormTitle = styled(Typography)``;

const Container = styled(Paper)`
  padding: 16px;
`;

export const Styled = {
  Form,
  FormButtonsContainer,
  FormTitle,
  Container,
};
