import React from "react"
import PropTypes from "prop-types"
import "../styles/main.css"
import Navbar from "./Navbar"
import Footer from "./footer"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const MainContent = styled.div`
    min-height: 75vmax;
    width: auto;
    overflow-x: hidden;
    background: linear-gradient(90deg, #000000 -3.07%, #3d3d3d 100%);
    color: rgb(32, 32, 32);
    padding-bottom: 5vh;
`
const Section = styled.div`
    flex: 1;
`



const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return (
      <MainContent>
        <Navbar/>
        <MainContent>
          <main>{children}</main>
        </MainContent>
        <Section/>
        <Footer/>
      </MainContent>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
