import * as React from "react"
import Layout from "../components/layout"

// Server-Side Rendering: Gatsby calls getServerData on the server for every request.
// Its return value is passed to the page as the `serverData` prop.
export async function getServerData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    if (!res.ok) throw new Error(`Response status ${res.status}`)
    const posts = await res.json()

    return {
      props: { posts, renderedAt: new Date().toISOString() },
      headers: { "Cache-Control": "no-store" },
    }
  } catch (error) {
    return { status: 500, props: { posts: [], error: error.message } }
  }
}

const SSRPage = ({ serverData }) => {
  const { posts, renderedAt, error } = serverData

  return (
    <Layout title="Server-Side Rendered" badge="SSR">
      <p>
        Fetched on the server at <code>{renderedAt}</code>. Refresh to see the
        timestamp change. View page source and the posts are already in the HTML.
      </p>
      {error && <p className="card">Failed to load posts: {error}</p>}
      {posts.map(post => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </Layout>
  )
}

export default SSRPage

export const Head = () => <title>SSR | Gatsby SSR / CSR Demo</title>
