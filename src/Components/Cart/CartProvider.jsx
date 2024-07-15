import React from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartList, setcartList] = useState([

  ]);
  return (
    <CartContext.Provider value={[cartList, setcartList]}>
      {props.children}
    </CartContext.Provider>
  );
};
