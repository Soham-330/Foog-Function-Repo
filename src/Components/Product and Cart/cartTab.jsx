import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();



    return (
        <>

            <div className='title2 title3'>
                <h2>Your Cart</h2>
            </div>
            <div className='cartTab'>


                <div>
                    {carts.map((item, key) =>
                        <CartItem key={key} data={item} />
                    )}
                </div>
                <div >
                    <button className='checkoutBtn'>CHECKOUT</button>
                </div>
            </div>
        </>

    )
}

export default CartTab