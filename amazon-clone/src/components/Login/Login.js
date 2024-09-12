// login.js
import React, { useState } from 'react';
import './login.css';
import { useNavigate , Link } from 'react-router-dom';  
import logo from '../../assets/image.png';
import { auth } from '../../firbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Updated hook

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Navigate to home on successful sign-in
        navigate('/');
      })
      .catch((error) => {
        alert(error.message); // Display error message to user
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential) {
          navigate('/'); // Navigate to home on successful registration
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message); // Display error message to user
      });
  };

  return (
    <div className='login'>
        <Link to='/'>
            <img className='login_logo' src={logo} alt='Logo' />
        </Link>

      <div className='login_container'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input 
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='submit'
            onClick={signIn}
            className='login_signInButton'>
            Sign-In
          </button>
        </form>
        <p>By signing in, you agree to the AMAXON GAKE CLONE conditions of use and sale. Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.</p>
        <button
          onClick={register}
          className='login_registerButton'>
          Create your account
        </button>
      </div>
    </div>
  );
}

export default Login;
