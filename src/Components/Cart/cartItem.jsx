import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartProvider";

const CartItem = (props) => {
  const [cartList, setcartList] = useContext(CartContext);

    const handleMinusQuantity = (id) => {
      const newCartList = cartList.map(item => {
        if (item.id === id && item.quantity>1) {
          return { ...item, quantity: Number(item.quantity)-1 };
        } else {
          return item;
        }
       });
      setcartList(newCartList);
    };

    const handlePlusQuantity = (id) => {
      const newCartList = cartList.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Number(item.quantity)+1 };
        } else {
          return item;
        }
       });
      setcartList(newCartList);

    };

    console.log(cartList)


  const handleDeleteItem = (id) => {
    const newCartList = cartList.filter((item) => item.id !== id);
    setcartList(newCartList);
  };
  

  return (
    <div className="cartItem">
      <div>
        <img className="cartItemImg" src={props.image} alt={props.name} />
      </div>
      <div className="itemDetails">
        <h3>{props.name}</h3>
    Minimum Quantity: {props.minimumQuantity}
        <p>₹{props.price * props.quantity}</p>
        <div className="cartBtns">
          <button className="plusMinusBtn" onClick={() => handleMinusQuantity(props.id)}>
            -
          </button>
          <span>{props.quantity}</span>
          <button className="plusMinusBtn" onClick={() => handlePlusQuantity(props.id)}>
            +
          </button>
          <button
            className="delBtn"
            onClick={() => handleDeleteItem(props.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#000000"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
