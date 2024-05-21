import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const handleSumit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <section className="container">
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleSumit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don&apos;t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
