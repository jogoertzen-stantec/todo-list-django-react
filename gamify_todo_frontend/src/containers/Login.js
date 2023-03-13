import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Navigate } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
        };

    if (isAuthenticated) {
        toast('Login successful! Welcome Back!', {
            position: toast.POSITION.TOP_CENTER,
            transition: Flip,
            type: 'success',
        });
        return <Navigate to="/todo" />
    }
    
    return(
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your gamify-todo account!</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className="form-group">
                    <label className='form-label'>Username:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='form-label mt-3'>Password:</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        minLength='6'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-4' type='submit'>Login</button>
            </form>
            <p className='mt-3'>
                Don't have an account? <a href='/register'>Sign up</a>
            </p>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);