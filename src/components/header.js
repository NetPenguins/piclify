//import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../components/main.css"
import "bulma/css/bulma.css"
//Create a basic header that is reactive.
const Header = ({ siteTitle }) => {
  const [isActive, setisActive] = React.useState(false);
  return(
    <>
    <header className="navbar" role="navigation">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="/"><img src="/icons/icon-512x512.png?v=335e9f89bf1811291c921be19f313a41" height="100" width="100" alt="KC Adventures"></img></a>
          <a
            onClick={() => { //create handle for burger drop down on mobile
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger is-dark ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start ">
            <a className="Block__LinkButton" href="/">Home</a>
            <a className="Block__LinkButton" href="/Oahu/">Oahu</a>
            <a className="Block__LinkButton" href="/StLucia/">St. Lucia</a>
          </div>
        </div>
      </nav>
    </header>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
