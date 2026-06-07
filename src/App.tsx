import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { RecordProvider } from './context/RecordContext'
import Home from './pages/Home'
import AddFeeding from './pages/AddFeeding'
import AddPoop from './pages/AddPoop'
import Stats from './pages/Stats'
import Settings from './pages/Settings'
import BottomNav from './components/BottomNav'

function AppContent() {
  const location = useLocation()
  const showNav = ['/', '/stats', '/settings'].includes(location.pathname)

  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-feeding" element={<AddFeeding />} />
        <Route path="/edit-feeding/:id" element={<AddFeeding />} />
        <Route path="/add-poop" element={<AddPoop />} />
        <Route path="/edit-poop/:id" element={<AddPoop />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {showNav && <BottomNav />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <RecordProvider>
        <AppContent />
      </RecordProvider>
    </Router>
  )
}

export default App
