import React, { useState } from 'react';
import './LoginPage.css'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    console.log('Form Data:', formData);
  };

  return (
    <div id="login-div">
      <h1 class="bold-text" id="welcomeback">welcome back!</h1>
      <form onSubmit={handleSubmit}>
        <div id="email">
          <label class="login-label" htmlFor="email">Email</label>
          <input placeholder="username / email" class="login-input" type="email" name="email" value={formData.email} onChange={handleChange} />
          <div class="login-divider"></div>
        </div>
        <div id="password">
          <label class="login-label" htmlFor="password">Password</label>
          <input placeholder="password" class="login-input" type="password" name="password" value={formData.password} onChange={handleChange} />
          <div class="login-divider"></div>
        </div>
        <div id="button-div">
          <button type="submit" class="bold-text" id="signin-button">sign in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
