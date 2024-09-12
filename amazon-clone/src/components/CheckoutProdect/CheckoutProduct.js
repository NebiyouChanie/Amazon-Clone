import React from 'react';
import './checkoutproduct.css';
import { useStateValue } from '../../StateProvider';
import StarIcon from '@mui/icons-material/Star';

function CheckoutProduct({ id, title, price, rating, image, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeItem = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  return (
    <div id={id} className='checkoutProduct'>
      <img className='checkoutProduct_image' src={image} alt={title} />
      <div className='checkoutProduct_info'>
        <p className='checkoutProduct_title'>{title}</p>
        <p className='checkoutProduct_price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct_rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='star' />
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeItem} className='product_button'>
            Remove Item
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
