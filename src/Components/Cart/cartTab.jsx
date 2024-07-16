import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { CartContext } from "./CartProvider";
import CartItem from "./cartItem";

const CartTab = () => {
  const [cartList, setcartList] = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let newTotalPrice = 0;
    cartList.forEach((item) => (newTotalPrice += item.price*item.quantity));
    setTotalPrice(newTotalPrice);
  }, [cartList]);


  return (
    <>
      <div className="title2 title3">
        <h2>Your Cart</h2>
      </div>
      <div className="cartTab">
        <div>
          {cartList.length>0 ? cartList.map((item) => (
            <CartItem
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              key={item.id}
              id = {item.id}
              image = {item.image}
            />
          )) : <div className="emptyCart"><h3>Your Cart is Empty</h3></div> }
        </div>
        <div>
          <h3>Total Price : {totalPrice}</h3>
        </div>
        <div>
          <button className="checkoutBtn"><h2>CHECKOUT</h2></button>
        </div>
      </div>
    </>
  );
};

export default CartTab;
