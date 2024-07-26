import "./Products.css";
import React, { useContext, useState } from "react";
import { IonButton, setupIonicReact } from "@ionic/react";
import { CartContext } from "../Cart/CartProvider";

setupIonicReact();

function ProductCard(props) {
  const [cartList, setCartList] = useContext(CartContext);
  const [quantity, setQuantity] = useState(props.minimumQuantity);

  const handleMinusQuantity = () => {
    setQuantity(quantity <= props.minimumQuantity ? props.minimumQuantity : quantity - 1);
  };

  const handlePlusQuantity = () => {
    setQuantity(Number(quantity) + 1);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    let itemExists = false;

    const newCartList = cartList.map((item) => {
      if (item.id === props.id) {
        itemExists = true;
        return { ...item, quantity: Number(item.quantity) + Number(quantity) };
      } else {
        return item;
      }
    });

    if (itemExists) {
      setCartList(newCartList);
    } else {
      setCartList((items) => [
        ...items,
        {
          id: props.id,
          name: props.name,
          image: props.image,
          price: Number(props.price),
          minimumQuantity: Number(props.minimumQuantity),
          quantity: Number(quantity),
        },
      ]);
    }
  };


  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    setCartList(cartList.filter((item) => item.id !== props.id));
  };

  const isItemInCart = cartList.some((item) => item.id === props.id);

  return (
    <>
      <div className="proCard">
        <div>
          <img className="proImg" src={props.image} alt={props.name} />
        </div>
        <div className="proText">
          <h3>{props.name}</h3>
          <p>{props.text}</p>
          <p>₹{props.price}</p>
          {/* <div>
            <button className="plusMinusBtn" onClick={handleMinusQuantity}>
              -
            </button>
            <span>{quantity}</span>
            <button className="plusMinusBtn" onClick={handlePlusQuantity}>
              +
            </button>
          </div>
        </div>
        <div> */}
          {isItemInCart ? (
            <IonButton className="ibutton3" onClick={handleRemoveFromCart}>
              Remove From Cart
            </IonButton>
          ) : (
            <IonButton className="ibutton3" onClick={handleAddToCart}>
              Add To Cart
            </IonButton>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;