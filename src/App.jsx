import './App.css'

function App() {
  return (
    <main className="login-page">
      <form className="login-form">
        <h1>Login</h1>

        <label htmlFor="username">Email or username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your email or username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="login-links">
          <a href="#forgot-password">Forgot password?</a>
          <a href="#register">Register</a>
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default App