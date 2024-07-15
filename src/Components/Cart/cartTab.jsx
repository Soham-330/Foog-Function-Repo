import React from "react";

import { useContext } from "react";
import { CartContext } from "./CartProvider";
import CartItem from "./cartItem";

const CartTab = () => {
  const [cartList, setcartList] = useContext(CartContext);

  return (
    <>
      <div className="title2 title3">
        <h2>Your Cart</h2>
      </div>
      <div className="cartTab">
        <div>
          {cartList.map((item) => (
            <CartItem
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              key={item.id}
              id = {item.id}
              image = {item.image}
            />
          ))}
        </div>
        <div>
          <button className="checkoutBtn">CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartTab;
