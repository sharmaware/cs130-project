import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    verifypassword: '',
    firstname: '',
    lastname: ''
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
    <div>
      <h1>Register Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="verifypassword">Verify Password:</label>
          <input id="verifypassword" type="password" name="verifypassword" value={formData.verifypassword} onChange={handleChange} />
        </div>
        <button type="submit">Register Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
