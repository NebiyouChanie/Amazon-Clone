import React from 'react';
import './order.css';
import moment from 'moment';
import CheckoutProduct from '../CheckoutProdect/CheckoutProduct';
import { NumericFormat } from 'react-number-format';

function Order({ order }) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className='order_id'>
        <small>{order.id}</small>
      </p>

      {/* Render the items in the basket */}
      {order.data.basket?.map((item) => (
        <CheckoutProduct 
          key={item.id} // It's a good practice to provide a unique key for each item
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}

      {/* Display the total amount of the order */}
      <h3>Order Total: 
        <NumericFormat
          value={order.data.amount / 100}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </h3>
    </div>
  );
}

export default Order;
