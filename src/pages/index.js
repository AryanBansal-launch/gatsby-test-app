import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

// Static Site Generation (default): this page is rendered to HTML once, at build time.
const IndexPage = () => (
  <Layout title="Gatsby Rendering Demo" badge="SSG">
    <p>
      This page is statically generated at build time. Built at:{" "}
      <code>{new Date().toISOString()}</code>
    </p>
    <div className="card">
      <h3><Link to="/ssr/">Server-Side Rendering →</Link></h3>
      <p>
        Uses <code>getServerData</code>. Data is fetched on the server on every
        request and the HTML arrives already populated.
      </p>
    </div>
    <div className="card">
      <h3><Link to="/csr/">Client-Side Rendering →</Link></h3>
      <p>
        HTML ships with an empty shell. Data is fetched in the browser with{" "}
        <code>useEffect</code> after hydration.
      </p>
    </div>
    <div className="card">
      <h3><Link to="/users/1/">Client-only dynamic route →</Link></h3>
      <p>
        <code>src/pages/users/[id].js</code>. No HTML is generated per user;
        the route and its data are resolved entirely in the browser.
      </p>
    </div>
  </Layout>
)

export default IndexPage

export const Head = () => <title>Home | Gatsby SSR / CSR Demo</title>
