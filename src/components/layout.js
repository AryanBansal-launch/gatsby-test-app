import * as React from "react"
import { Link } from "gatsby"
import "./layout.css"

const Layout = ({ title, badge, children }) => (
  <div className="container">
    <nav className="nav">
      <Link to="/" activeClassName="active">Home (SSG)</Link>
      <Link to="/ssr/" activeClassName="active">SSR</Link>
      <Link to="/csr/" activeClassName="active">CSR</Link>
      <Link to="/users/1/" partiallyActive activeClassName="active">Client-only route</Link>
    </nav>
    <main>
      <h1>
        {title} {badge && <span className={`badge badge-${badge.toLowerCase()}`}>{badge}</span>}
      </h1>
      {children}
    </main>
  </div>
)

export default Layout
