import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import InfiniteImages from "../components/InfiniteImages"

const Oahu = () => {
  return (
    <Layout>
      <SEO title="Oahu" />
      <div className="Block__Divider--hidden"/>
      <InfiniteImages site="oahu"/>
    </Layout>
  )
}

export default Oahu