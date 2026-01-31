import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../graphql/mutations';
import Button from '../components/common/Button/Button';
import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
      navigate('/');
    },
    onError: (err) => {
      setError(err.message);
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login({ variables: formData });
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>TMS</h1>
            <p>Transportation Management System</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>
            
            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <Button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className={styles.info}>
            <h3>Demo Credentials</h3>
            <div className={styles.credentials}>
              <div>
                <strong>Admin:</strong> admin / admin123
              </div>
              <div>
                <strong>Employee:</strong> employee / emp123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
