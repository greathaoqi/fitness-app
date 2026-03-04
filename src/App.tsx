import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Plans from './pages/Plans'
import PlanDetail from './pages/PlanDetail'
import Workout from './pages/Workout'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:planId" element={<PlanDetail />} />
          <Route path="/workout/:planId" element={<Workout />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
