import { NavLink } from "react-router-dom";

import { Scroll, Timer } from "phosphor-react";
import { HeaderContainer } from "./styles";

// eslint-disable-next-line import/no-absolute-path
import igniteLogo from "/ignite-logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
