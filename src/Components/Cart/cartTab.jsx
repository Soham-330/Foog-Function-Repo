import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "./CartProvider";
import CartItem from "./cartItem";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const CartTab = () => {
  const [cartList, setcartList] = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let newTotalPrice = 0;
    cartList.forEach((item) => (newTotalPrice += item.price * item.quantity));
    setTotalPrice(newTotalPrice);
  }, [cartList]);

  const handleCheckout = () => {
    let allQuantitiesMet = true;
    cartList.forEach((item) => {
      if ((item.quantity > item.availableQuantity)) {
        alert(`This much Quantity of ${item.name} is not available in stock currently,\nPlease select a lower quantity`);
        allQuantitiesMet = false;
      }
    });
    if (allQuantitiesMet) {
      setShowCheckoutForm(true);
    }
  };

  const handlePayment = async (customerDetails) => {
    // Create an array of items in the format "product_name - product_quantity"
    const items = cartList.map(item => `${item.name} - ${item.quantity} * ₹${item.price} = ₹${item.quantity * item.price}`);

    const order = {
      address: customerDetails.address,
      isCompleted: false,
      name: customerDetails.name,
      number: Number(customerDetails.phone),
      email: customerDetails.email,
      items: items,
      totalPrice: totalPrice
    };



    try {
      await addDoc(collection(db, "orders"), order);
      // Navigate to the payment page
      navigate("/payment");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="title2 title3">
        <h2>Your Cart</h2>
      </div>
      <div className="cartTab">
        <div>
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <CartItem
                name={item.name}
                quantity={item.quantity}
                minimumQuantity={item.minimumQuantity}
                price={item.price}
                key={item.id}
                id={item.id}
                image={item.image}
              />
            ))
          ) : (
            <div className="emptyCart">
              <h2>Your Cart is Empty</h2>
            </div>
          )}
        </div>
        <div>
          <h3>Total Price : ₹{totalPrice}</h3>
        </div>
        <div>
          {!showCheckoutForm ? (
            <button className="checkoutBtn" onClick={handleCheckout}>
              <h2>CHECKOUT</h2>
            </button>
          ) : (
            <CheckoutForm handleSubmit={handlePayment} />
          )}
        </div>
      </div>
    </>
  );
};

export default CartTab;