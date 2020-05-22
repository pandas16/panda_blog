import React from "react"

import { Link } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <div align="center">
      <Link className="btn btn-primary" to={'/'} >
        返回首页
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
