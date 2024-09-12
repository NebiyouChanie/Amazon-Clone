import React from 'react'
import './subtotal.css'
import {NumericFormat} from 'react-number-format';
import {useStateValue} from '../../StateProvider'

  
export const baskettotal =(basket)  =>{  
  return basket?.reduce((amount,item)=>amount + item.price ,0);
}
  
function Subtotal() {
  const [{basket, user},dispatch] = useStateValue();
 
  return (
    <div className='subtotal'>
        <p>
            Subtotal({basket.length}):<strong> 
                <NumericFormat 
                value={baskettotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale={true}
                />
                
            </strong>
        </p>
        <small className='subtotal_gift'>
            <input type='checkbox' /> This order contains a gift
        </small>
    </div>
  )
}

export default Subtotal;