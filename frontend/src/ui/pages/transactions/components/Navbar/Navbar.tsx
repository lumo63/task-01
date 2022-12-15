import { Styled } from "./Navbar.styles";

export const Navbar = () => {
  return (
    <Styled.Navbar variant={"outlined"}>
      <Styled.NavbarTitle variant={"h4"}>My Transactions</Styled.NavbarTitle>
    </Styled.Navbar>
  );
};
