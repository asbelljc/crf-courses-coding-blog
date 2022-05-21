import { useState } from 'react';
import Head from 'next/head';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [credentialError, setCredentialError] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState('');
  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  const updateEmailInputValue = (e) => {
    setEmailInputValue(e.target.value);
    setEmailRequiredError(false);
  };

  const updatePasswordInputValue = (e) => {
    setPasswordInputValue(e.target.value);
    setPasswordRequiredError(false);
  };

  const submitLoginRequest = () => {
    setLoading(true);
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Login | Admin</title>
      </Head>
      <div className="login-wrapper">
        <div className="login-content-container">
          <div className="login-form-container">
            {credentialError ? (
              <div className="login-form-error-block">
                <span>Email address and/or password is incorrect.</span>
              </div>
            ) : null}
            <div className="login-form-top-header">
              <span>Admin Login</span>
            </div>
            <div className="login-form-field">
              <input
                onChange={updateEmailInputValue}
                value={emailInputValue}
                type="email"
                autoComplete="new-password"
                placeholder="Email Address"
                className={
                  credentialError || emailRequiredError ? 'error' : null
                }
              />
              {emailRequiredError ? (
                <div className="login-form-error-msg">
                  <span>Email field is required.</span>
                </div>
              ) : null}
            </div>
            <div className="login-form-field">
              <input
                onChange={updatePasswordInputValue}
                value={passwordInputValue}
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                className={
                  credentialError || passwordRequiredError ? 'error' : null
                }
              />
              {passwordRequiredError ? (
                <div className="login-form-error-msg">
                  <span>Password field is required.</span>
                </div>
              ) : null}
            </div>
            <div className="login-form-submit-btn-container">
              {!loading ? (
                <div
                  onClick={submitLoginRequest}
                  className="login-form-submit-btn"
                >
                  <span>Login</span>
                </div>
              ) : (
                <div className="login-form-submit-btn loading">
                  <span>Loading</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
