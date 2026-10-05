import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout title="Page not found">
    <p><Link to="/">Go home</Link></p>
  </Layout>
)

export default NotFoundPage

export const Head = () => <title>Not found</title>
