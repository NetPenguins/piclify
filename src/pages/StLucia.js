import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GetImages from "../components/GetImages"

const StLucia = () => {
  return (
    <Layout>
      <SEO title="StLucia" />
      <div className="Block__Divider--hidden"/>
      <GetImages site="stlucia"/>
    </Layout>
  )
}

export default StLucia
