import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import {BrowserRouter as Router, Routes ,Route  } from 'react-router-dom' ;
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';
import { auth } from './firbase';
import Payment from './components/payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders/Orders';
function App() {
  const [{},dispatch] =useStateValue();

  const  promise = loadStripe('pk_test_51Px48tP9xJa9GgEdABDWC14lTgMtJULlZGvS2ZvPE4ZAsywRZDnlWOAkVrPH4TIPhRxBVmjmCkUCoYnuBI1gzZCP00DYpNrOI0')
  
  useEffect(()=>{
      auth.onAuthStateChanged((authUser) =>{
        if (authUser) {
          dispatch({
            type :'SET_USER',
            user : authUser,
          });
        } else {
          dispatch({
            type :'SET_USER',
            user : null
          });
        }
      });
  },[])
  return (
    <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/orders' element={<Orders />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/payment'
                element={<Elements stripe={promise}> 
                  <Payment />
                </Elements>}>
            </Route>
          </Routes>
        </div>
    </Router>
    
  );
}

export default App;
