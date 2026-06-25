import { useEffect, useState } from 'react'
import { buildApiUrl, extractCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(buildApiUrl('teams'))
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setTeams(extractCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    void loadTeams()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {teams.map((team) => (
            <li key={team._id ?? team.id ?? team.name} className="list-group-item">
              <strong>{team.name ?? 'Team'}</strong>
              <div className="small text-muted">Members: {team.members?.length ?? 0}</div>
            </li>
          ))}
          {teams.length === 0 && (
            <li className="list-group-item text-muted">No teams found.</li>
          )}
        </ul>
      )}
    </section>
  )
}

export default Teams
