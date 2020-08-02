import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/main.css"
import jQuery from "jquery"
const IndexPage = () => (
    <Layout>
      <SEO title="Home" />
      <div className="MainContent">
        {/* Map element will go here highlighting travel locations */}
      </div>
  </Layout>
)

export default IndexPage
