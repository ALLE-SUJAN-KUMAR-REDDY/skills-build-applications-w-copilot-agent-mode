import { useEffect, useState } from 'react'
import { buildApiUrl, extractCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(buildApiUrl('users'))
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setUsers(extractCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    void loadUsers()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id ?? user.id ?? user.email} className="list-group-item">
              <strong>{user.name ?? 'Unnamed user'}</strong>
              <div className="text-muted small">{user.email ?? 'No email'}</div>
            </li>
          ))}
          {users.length === 0 && (
            <li className="list-group-item text-muted">No users found.</li>
          )}
        </ul>
      )}
    </section>
  )
}

export default Users
