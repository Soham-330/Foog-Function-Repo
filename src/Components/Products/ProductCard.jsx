import "./Products.css";
import React from "react";
import { IonButton, setupIonicReact } from "@ionic/react";
import { useContext, useState } from "react";
import { CartContext } from "../Cart/CartProvider";

setupIonicReact();

function ProductCard(props) {
  const [cartList, setcartList] = useContext(CartContext);

  const [quantity, setQuantity] = useState(props.minimumQuantity);

  const handleMinusQuantity = () => {
    setQuantity(quantity <= props.minimumQuantity ? props.minimumQuantity : quantity - 1);
  };
  const handlePlusQuantity = () => {
    setQuantity(Number(quantity) + 1);
  };
  // const handleAddToCart = (e, id) => {
  //   e.preventDefault();

//   const index = cart.findIndex(item => item.id === props.id);

//   const newCartList = cartList.map(item => {
//     if (item.id === id) {
//       return { ...item, quantity: item.quantity+quantity };
//     } else {
//       return [...item]
//     }
//    });

//    setcartList(newCartList);

// else{
//        setcartList((items) => [
//       ...items,
//       {
//         id: props.id,
//         name: props.name,
//         price: props.price,
//         image: props.image,
//         quantity: quantity,
//       },
//     ]);
//   };
//   }


function handleAddToCart(e) {
  e.preventDefault();
    // Check if the product is already in the cart

    let itemExists = false;
    // const index = cartList.findIndex(item => item.id === props.id);

        // Product is already in the cart, update the quantity

        const newCartList = cartList.map(item => {
              if (item.id === props.id) {
                itemExists = true;
                return { ...item, quantity: item.quantity+quantity };
              } else {
                return item
              }
        });
        setcartList(newCartList)
 
    if(!itemExists) {
        // Product is not in the cart, add it
        setcartList((items) => [
                ...items,
                {
                  id: props.id,
                  name: props.name,
                  price: props.price,
                  image: props.image,
                  minimumQuantity: props.minimumQuantity,
                  quantity: quantity,
                },
              ]);
            };
  }



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
          <p>Minimum Quantity: {props.minimumQuantity}</p>
          <div>
            <button className="plusMinusBtn" onClick={handleMinusQuantity}>
              -
            </button>
            <span>{quantity}</span>
            <button className="plusMinusBtn" onClick={handlePlusQuantity}>
              +
            </button>
          </div>
        </div>
        <div>
          <IonButton className="ibutton3" onClick={(e) =>handleAddToCart(e)}>
            Add To Cart
          </IonButton>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
