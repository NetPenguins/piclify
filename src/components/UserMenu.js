import React, { useState, useEffect } from "react"
import styled from "styled-components"
import tempIcon from "../images/icon.png"
import { Link } from "gatsby"

const MenuBox = styled.div`
    flex-direction: column;
    position: fixed;
    max-width: 45%;
    min-width: 22%;
    border-bottom-right-radius: 8px;
    box-shadow: 2px 2px 5px ;
    justify-content: flex-start;
    padding-top: 2vh;
    padding-bottom: 2vh;
    padding-left: 5%;
    padding-right: 5%;
    margin-left: auto;
    background: linear-gradient(90deg, #3f3f3f -3.07%, #212a3b 100%);
    color: rgb(32, 32, 32);
    transition: all 0.3s ease-in;
    top: 8vh;
    left: ${props => (props.open ? "-100%" : "0")};
    @media (max-width: 768px) {
        max-width: 70%;
        min-width: 32%;
    }
`

const LogoWrap = styled.div`
  margin: 0 auto;
  flex: 0 1 36px;

  @media (max-width: 768px) and (orientation: landscape) {
    flex: 0 1 10px;
  }
  & > a img.is-rounded{
    width: 4.75rem;
    transition: all 200ms ease-in;
    position: relative;
  }
`

const UserMenu = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  
  const [imgURL, setImg] = React.useState()

  return (
      <div>
        {/* Stub for where a user menu component. Currently only displays site icon
            Future enhancements will allow users to login and interact with messages, likes and shares. */}
        <LogoWrap id="UserLogo"
          navbarOpen={navbarOpen}
          onClick={() => {
              setNavbarOpen(!navbarOpen)
          }}>
          <Link class="image is-nav-image" to="/">
              <img class="is-rounded" src={imgURL || tempIcon}/>
          </Link>
        </LogoWrap>
        {/* {navbarOpen ? (
          <MenuBox id="UserMenu" navbarOpen={navbarOpen} onMouseLeave={() => {
              setNavbarOpen(!navbarOpen)
          }}>
            {currUser ? <Logout/> : <Login/>}
          </MenuBox>
        ) : (
          <MenuBox open id="UserMenu" navbarOpen={navbarOpen} onMouseLeave={() => setNavbarOpen(!navbarOpen)}>
            {currUser ? <Logout/> : <Login/>}
          </MenuBox>
        )} */}
      </div>
  )
}

export default UserMenu
