import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "bulma/css/bulma.css"
import "../components/main.css"
const Footer = () => (
  <footer className="hero-foot is-dark">
      <div>
        <a href={"/"}>
          <img src="/icons/icon-72x72.png" alt="KC Adventures"/>
        </a>
      </div>
      <a
        href={"http://github.com/NetPenguins"}
        target="_blank"
        rel="noreferrer noopener"
      >
        Made @ NetPenguins
      </a>
      <div/>
      <strong style={{color: "white"}}>KC Adventures by Chad Wilson.</strong>
      <div style={{color: 'white'}}>Source Code  -
        <a href="http://opensource.org/licenses/mit-license.php"> MIT License</a></div>.
          <a className="button is-danger is-small footim" href="https://github.com/NetPenguins/piclify/issues/new/choose">
            Report a Bug
          </a>
          <a className="button is-primary is-small footim" href="https://github.com/NetPenguins/piclify/issues/new/choose">
            Suggestions
          </a> 
      <br></br>
      <div style={{color: 'white'}}>Example Images  -
        <a href="https://pixabay.com/service/license/"> Pixabay License</a></div>.

  </footer>
)

export default Footer
