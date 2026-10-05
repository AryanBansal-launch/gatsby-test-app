import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"

// Client-only route via the File System Route API: /users/:id.
// Gatsby builds no HTML per user. The id comes from the URL in the browser.
const UserPage = ({ params }) => {
  const { id } = params
  const [user, setUser] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setUser(null)
    setError(null)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`User ${id} not found`)
        return res.json()
      })
      .then(setUser)
      .catch(err => setError(err.message))
  }, [id])

  const prevId = Math.max(1, Number(id) - 1)
  const nextId = Math.min(10, Number(id) + 1)

  return (
    <Layout title={`User #${id}`} badge="CSR">
      <p>
        Client-only route. URL param <code>id = {id}</code> is read in the browser.
      </p>
      {error && <p className="card">{error}</p>}
      {!user && !error && <p>Loading user…</p>}
      {user && (
        <div className="card">
          <h3>{user.name}</h3>
          <p className="meta">@{user.username} · {user.email}</p>
          <p>{user.address.street}, {user.address.city}</p>
          <p>Works at <strong>{user.company.name}</strong>: "{user.company.catchPhrase}"</p>
        </div>
      )}
      <p>
        <Link to={`/users/${prevId}/`}>← Previous</Link> ·{" "}
        <Link to={`/users/${nextId}/`}>Next →</Link>
      </p>
    </Layout>
  )
}

export default UserPage

export const Head = ({ params }) => <title>User {params.id} | Gatsby SSR / CSR Demo</title>
