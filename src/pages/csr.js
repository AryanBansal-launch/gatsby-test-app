import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

// Client-Side Rendering: the static HTML contains only the loading state.
// Data is fetched in the browser after React hydrates the page.
const CSRPage = () => {
  const [users, setUsers] = React.useState([])
  const [status, setStatus] = React.useState("loading")
  const [fetchedAt, setFetchedAt] = React.useState(null)

  const loadUsers = React.useCallback(async () => {
    setStatus("loading")
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      if (!res.ok) throw new Error(`Response status ${res.status}`)
      setUsers(await res.json())
      setFetchedAt(new Date().toISOString())
      setStatus("done")
    } catch (error) {
      setStatus(`error: ${error.message}`)
    }
  }, [])

  React.useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return (
    <Layout title="Client-Side Rendered" badge="CSR">
      <p>
        This list is fetched in the browser.{" "}
        {fetchedAt && <>Last fetched at <code>{fetchedAt}</code>.</>}
      </p>
      <p><button onClick={loadUsers}>Refetch in browser</button></p>

      {status === "loading" && <p>Loading users…</p>}
      {status.startsWith("error") && <p className="card">{status}</p>}
      {status === "done" &&
        users.map(user => (
          <div className="card" key={user.id}>
            <h3><Link to={`/users/${user.id}/`}>{user.name}</Link></h3>
            <p className="meta">{user.email} · {user.company.name}</p>
          </div>
        ))}
    </Layout>
  )
}

export default CSRPage

export const Head = () => <title>CSR | Gatsby SSR / CSR Demo</title>
