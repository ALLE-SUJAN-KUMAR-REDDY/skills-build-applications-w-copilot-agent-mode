import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">OctoFit Tracker</h1>
        <nav className="nav nav-pills gap-2 flex-wrap">
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
