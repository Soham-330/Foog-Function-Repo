import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../store/cart';
import { products } from './ProductGrid';




const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.filter(product => product.id === productId)[0];
        setDetail(findDetail);
        console.log(findDetail)
    },)

    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    }
    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    }
    const handleZeroQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: 0
        }));
    }
    
    return (

        <div className='cartItem'>
            <div > 
            <img className="cartItemImg" src={detail.image} alt={detail.name}  />
            </div>
            <div className="itemDetails">
                <h3>{detail.name}</h3>
                <p>₹{detail.price * quantity}</p>
                <div className='cartBtns'>
                    <button className='plusMinusBtn' onClick={handleMinusQuantity}>-</button>
                    <span>{quantity}</span>
                    <button className='plusMinusBtn' onClick={handlePlusQuantity}>+</button>
                    <button className='delBtn' onClick={handleZeroQuantity}>  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
                  

            </div>

        </div>
    )
}

export default CartItem