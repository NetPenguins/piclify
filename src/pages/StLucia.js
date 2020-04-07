import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import InfiniteImages from "../components/InfiniteImages"

const StLucia = () => {
  return (
    <Layout>
      <SEO title="StLucia" />
      <div className="Block__Divider--hidden"/>
      <InfiniteImages site="stlucia"/>
    </Layout>
  )
}

export default StLucia
