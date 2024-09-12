import React, { useEffect, useState } from 'react';
import './payment.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../CheckoutProdect/CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { NumericFormat } from 'react-number-format';
import { baskettotal } from '../Subtotal/Subtotal';
import axios from '../../axios';
import { db } from '../../firbase';
import { collection, doc, setDoc } from 'firebase/firestore';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `/payments/create?total=${baskettotal(basket) * 100}` // Convert total to cents
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    if (basket.length > 0) {
      getClientSecret();
    }
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const userRef = doc(collection(db, 'users'), user?.uid);
      const orderRef = doc(collection(userRef, 'orders'), paymentIntent.id);

      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setProcessing(false);
      setError(null);
      dispatch({
        type: 'EMPTY_BASKET',
      });
      navigate('/orders');
    } catch (error) {
      console.error('Error storing order in Firestore:', error);
      setError('Failed to store order details.');
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment_container'>
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment_address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>

        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment_items'>
       
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
                hideButton={true}
              />
            ))}
          </div>
        </div>
    
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment_details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment_priceContainer'>
                <h3>
                  Order Total:{' '}
                  <NumericFormat
                    value={baskettotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </h3>
                <button disabled={processing || disabled || succeeded}>
                  {processing ? 'Processing' : 'Buy Now'}
                </button>
              </div>
              {error && <div className='error'>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
