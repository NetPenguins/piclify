import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import GetImages from "./GetImages"

const GalleryPage = ({title, site}) => {
    return (
        <Layout>
          <SEO title={title} />
          <GetImages site={site}/>
        </Layout>
    )
}

export default GalleryPage
