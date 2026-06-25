import { useEffect, useState } from 'react'
import { buildApiUrl, extractCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(buildApiUrl('activities'))
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        setActivities(extractCollection(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    void loadActivities()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id ?? activity.id} className="list-group-item">
              <strong>{activity.type ?? 'Activity'}</strong>
              <div className="small text-muted">
                Duration: {activity.durationMinutes ?? '-'} min | Calories: {activity.caloriesBurned ?? '-'}
              </div>
            </li>
          ))}
          {activities.length === 0 && (
            <li className="list-group-item text-muted">No activities found.</li>
          )}
        </ul>
      )}
    </section>
  )
}

export default Activities
