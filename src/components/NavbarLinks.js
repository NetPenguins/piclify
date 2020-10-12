import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const NavItem = styled(Link)`
  text-decoration: none;
  color: rgb(215, 231, 241);
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 200ms ease-in;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: crimson;
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: crimson;
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const NavbarLinks = () => {
  return (
    <>
      <NavItem to="/" activeStyle={{
        color: 'crimson'
      }}>
        Home
      </NavItem>
      <NavItem to="/Oahu" activeStyle={{
        color: 'crimson'
      }}>
        Oahu
      </NavItem>
      <NavItem to="/StLucia" activeStyle={{
        color: 'crimson'
      }}>
        St. Lucia
      </NavItem>
    </>
  )
}

export default NavbarLinks