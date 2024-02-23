
import Navbar from "./components/Navbar"
import TeamPage from "./components/TeamPage"
import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<TeamPage teams={[]} achievements={[]} updates={[]} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App