import { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const VALID_EMAIL = 'atharfatima85@gmail.com';
const VALID_PASSWORD = '123456789';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (cleanEmail === VALID_EMAIL && cleanPassword === VALID_PASSWORD) {
        if (rememberMe) {
          localStorage.setItem('surveyor_auth', 'true');
          localStorage.setItem('surveyor_user_email', VALID_EMAIL);
        } else {
          sessionStorage.setItem('surveyor_auth', 'true');
          sessionStorage.setItem('surveyor_user_email', VALID_EMAIL);
        }
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 350);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-container">
        {/* Top Branding */}
        <div className="login-header">
          <div className="login-brand-icon">
            <span className="brand-pin">📍</span>
          </div>
          <span className="login-eyebrow">LONDON RICS SURVEYORS</span>
          <h1 className="login-title">Surveyor Finder</h1>
          <p className="login-subtitle">
            Sign in with your account to access the surveyor search portal
          </p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error-banner" role="alert">
              <span>{error}</span>
            </div>
          )}

          <div className="login-field-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="login-input-wrap">
              <FiMail className="login-input-icon" aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <div className="login-field-group">
            <label htmlFor="login-password">Password</label>
            <div className="login-input-wrap">
              <FiLock className="login-input-icon" aria-hidden="true" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="login-options-row">
            <label className="login-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Signing in…</span>
            ) : (
              <>
                <span>Sign In</span>
                <FiArrowRight aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
