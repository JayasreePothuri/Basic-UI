import { useState } from 'react'
import './SignIn.css'

function SignIn({ onSignIn }) {
  const [role, setRole] = useState('developer')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSignIn(email)
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

          <button type="submit" className="signin-continue">
            Continue
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
