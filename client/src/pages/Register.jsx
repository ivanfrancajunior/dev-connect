import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password
    };

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const data = JSON.stringify(newUser);

      const res = await axios.post(
        'http://localhost:3001/api/users',
        data,
        config
      );

      console.log(res.data);

      if (res.data) {
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      }

      return res.data;
    } catch (err) {
      console.error(err.response.data.message);
      alert(err.response.data.message);
    }
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
