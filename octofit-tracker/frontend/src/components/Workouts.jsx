import { useEffect, useState } from 'react'
import { extractCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const workoutsEndpoint = `${apiBase}/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(workoutsEndpoint)
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(extractCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    void loadWorkouts()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {workouts.map((workout) => (
            <li key={workout._id ?? workout.id} className="list-group-item">
              <strong>{workout.title ?? 'Workout'}</strong>
              <div className="small text-muted">
                Intensity: {workout.intensity ?? '-'} | Duration: {workout.durationMinutes ?? '-'} min
              </div>
            </li>
          ))}
          {workouts.length === 0 && (
            <li className="list-group-item text-muted">No workouts found.</li>
          )}
        </ul>
      )}
    </section>
  )
}

export default Workouts
