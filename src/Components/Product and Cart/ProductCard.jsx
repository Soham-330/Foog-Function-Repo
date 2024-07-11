import './Products.css'
import React from 'react'
import { IonButton, setupIonicReact } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import iconCart from "../assests/iconCart.png"
import { useState } from 'react'
import { addToCart } from '../store/cart'
setupIonicReact();
function ProductCard(props) {

    const carts = useSelector(store => store.cart.items);
    const { id, image, name, price, text } = props.data;
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);


    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    }
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            quantity: quantity
        }));
    }
    return (
        <>

            <div className="proCard">
                <div>
                    <img className="proImg" src={image} alt="{name}" />
                </div>
                <div className="proText">
                    <h3>{name}</h3>
                    <p>{text}</p>
                    <p>₹{price}</p>
                    <div>
                    <button className='plusMinus' onClick={handleMinusQuantity}>-</button>
                    <span>{quantity}</span>
                    <button className='plusMinus' onClick={handlePlusQuantity}>+</button>
                    </div>
                    
                </div>
                <div>
                <IonButton className='ibutton3' onClick={handleAddToCart}>
                    Add To Cart
                </IonButton>
                </div>
              

            </div>

        </>
    )
}

export default ProductCard
