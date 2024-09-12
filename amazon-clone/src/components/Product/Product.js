import React from 'react'
import './product.css'
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from '../../StateProvider';

function Product({ id, title, image, price, rating }) {
    const [{basket},dispatch] =useStateValue();
    
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item : {
                id:id,
                title : title,
                image : image,
                price : price,
                rating : rating,
            },
        })
  };
  
    return (
    <div className='product'>
        <div className='product_info'>
            <p>{title}</p>
            <p className='product_price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='product_rating'>

                {Array(5)
                .fill()
                .map((_,i)=>(<StarIcon className='star'/>))}                 
            </div>
            <div className='product_image'>
                <img src={image} alt="" />
            </div>
            <button onClick={addToBasket} className='product_button'>Add to Basket</button>
        </div>
    </div>
  )
}

export default Product