import { useState } from 'react'
import './SignIn.css'

const SIGNIN_URL = 'http://127.0.0.1:4000/api/signin'

function SignIn({ onSignIn }) {
  const [role, setRole] = useState('developer')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors([])
    setIsSubmitting(true)

    try {
      const res = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await res.json()

      if (res.ok) {
        onSignIn(email)
      } else {
        const messages = data.detail.map((item) =>
          typeof item === 'string' ? item : item.msg
        )
        setErrors(messages)
      }
    } catch {
      setErrors(['Could not reach the server. Is the backend running?'])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="signin-page">
      <div className="signin-card">
        <div className="signin-topbar" />

        <h1 className="signin-heading">Sign in to the console</h1>
        <p className="signin-subtext">Choose the workspace you are signing in to.</p>

        <div className="signin-tabs">
          <button
            type="button"
            className={
              role === 'developer' ? 'signin-tab signin-tab-active' : 'signin-tab'
            }
            onClick={() => setRole('developer')}
          >
            Developer
          </button>
          <button
            type="button"
            className={role === 'admin' ? 'signin-tab signin-tab-active' : 'signin-tab'}
            onClick={() => setRole('admin')}
          >
            Super Admin
          </button>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="signin-email" className="signin-label">
            Work email
          </label>
          <input
            id="signin-email"
            type="email"
            className="signin-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="signin-password" className="signin-label">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            className="signin-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="signin-row">
            <label className="signin-checkbox">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              Keep me signed in
            </label>
            <a href="#forgot-password" className="signin-forgot">
              Forgot password
            </a>
          </div>

          {errors.length > 0 && (
            <ul className="signin-errors">
              {errors.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          )}

          <button type="submit" className="signin-continue" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        <div className="signin-divider">
          <span>OR</span>
        </div>

        <a href="#sso" className="signin-sso">
          <svg
            className="signin-shield"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z" />
          </svg>
          Continue with enterprise SSO (SAML)
        </a>

        <p className="signin-register-text">
          Don't have an account?{' '}
          <a href="#register" className="signin-register-button">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}

export default SignIn
