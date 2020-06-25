import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GetImages from "../components/GetImages"

const Oahu = () => {
  return (
    <Layout>
      <SEO title="Oahu" />
      <div className="Block__Divider--hidden"/>
      <GetImages site="oahu"/>
    </Layout>
  )
}

export default Oahu