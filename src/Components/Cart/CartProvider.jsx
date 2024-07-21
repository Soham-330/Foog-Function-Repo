import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  
  const [cartList, setcartList] = useState(() => {
  // Retrieve the cart from local storage or initialize an empty array
    const savedCartList = localStorage.getItem('cartList');
    return savedCartList ? JSON.parse(savedCartList) : [];
  });

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);


  return (
    <CartContext.Provider value={[cartList, setcartList]}>
      {props.children}
    </CartContext.Provider>
  );
};
