import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/main.css"

const IndexPage = () => (
    <Layout>
      <SEO title="Home" />
      <div className="MainContent">
        <div className="stipe Block__Divider--hidden"/>
        <div className="stripe bg-teal">
          <div className="ActionBlock"> 
            <div className="ActionBlock__Title">
              Oahu
            </div>
              <a href="/Oahu/" className="ActionBlock__Link">
                Gallery
              </a>
          </div>
        </div>
        <div className="stripe bg-teal">
          <div className="ActionBlock"> 
            <div className="ActionBlock__Title">
              St. Lucia
            </div>
              <a href="/StLucia/" className="ActionBlock__Link">
                Gallery
              </a>
          </div>
        </div>
      </div>
  </Layout>
)

export default IndexPage
