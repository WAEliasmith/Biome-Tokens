import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import generateAvatar from "../../utils/generateAvatar";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";

const Navbar = ({ nearConfig, wallet }) => {
  const { pathname } = useLocation();

  return (
    <StyledNav className="py-4 flex items-center justify-between mx-auto">
      <Logo />
      <div className="flex items-center">
        <div className="flex">
          <NavLink exact activeClassName="active-link" to="/">
            Home
          </NavLink>
          <NavLink
            activeClassName="active-link"
            className="mx-8"
            to="/created-games"
          >
            Created Tokens
          </NavLink>
        </div>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  max-width: 85%;

  & a {
    font-weight: 600;
    padding: 0 0.6rem;
  }

  & .near-line {
    height: 2.5rem;
    width: 1px;
  }

  & .active-link {
    position: relative;

    &::after {
      position: absolute;
      content: "";
      height: 2px;
      width: 100%;
      margin-top: 10px;
      background: #ff6433;
      bottom: -0.2rem;
      left: 0;
    }
  }
`;

export default Navbar;
