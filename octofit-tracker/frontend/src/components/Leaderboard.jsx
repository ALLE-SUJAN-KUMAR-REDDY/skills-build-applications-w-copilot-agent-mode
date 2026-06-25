import { useEffect, useState } from 'react'
import { extractCollection } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(leaderboardEndpoint)
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setLeaderboard(extractCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    void loadLeaderboard()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {leaderboard.map((entry) => (
            <li key={entry._id ?? entry.id} className="list-group-item d-flex justify-content-between">
              <span>Rank {entry.rank ?? '-'}</span>
              <strong>{entry.score ?? 0} pts</strong>
            </li>
          ))}
          {leaderboard.length === 0 && (
            <li className="list-group-item text-muted">No leaderboard entries found.</li>
          )}
        </ul>
      )}
    </section>
  )
}

export default Leaderboard
