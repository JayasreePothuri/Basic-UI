import { useState } from 'react'
import Home from './Home.jsx'
import SignIn from './Signin.jsx'
import Dashboard from './Dashboard.jsx'
import './App.css'

function App() {
  const [loggedInEmail, setLoggedInEmail] = useState(null)

  if (loggedInEmail) {
    return <Dashboard username={loggedInEmail} onLogout={() => setLoggedInEmail(null)} />
  }

  return (
    <div className="app-split">
      <Home />
      <SignIn onSignIn={setLoggedInEmail} />
    </div>
  )
}

export default App
