import React from 'react';
import './checkout.css';
import Subtotal from '../Subtotal/Subtotal';
import CheckoutProduct from '../CheckoutProdect/CheckoutProduct';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

function Checkout() {
  const navigate = useNavigate();
  const [{ basket, user }] = useStateValue();

  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <img
          className='checkout_ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt=''
        />
        <h3>Hello, {user ? user.email : 'Guest'}</h3>
        <h2 className='checkout_title'>Your shopping Basket</h2>

        {/* Render each CheckoutProduct by iterating over the basket */}
        {basket.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
          />
        ))}
      </div>
      <div className='checkout_right'>
        <Subtotal />
        <button onClick={(e) => navigate('/payment')}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Checkout;
