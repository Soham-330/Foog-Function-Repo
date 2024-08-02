import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartProvider";
import React from 'react';
import { IonButton } from "@ionic/react";

const PaymentPage = () => {

  const [cartList, setcartList] = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const [payDone, setPayDone] = useState(false);

  const toggleSwitch = () => {
    setcartList([])
    setPayDone(!payDone);
  };


  useEffect(() => {
    let newTotalPrice = 0;
    cartList.forEach((item) => (newTotalPrice += item.price * item.quantity));
    setTotalPrice(newTotalPrice);
  }, [cartList]);

  return (
    <>
      <div className='title2 title3'>
        <h2>Payment Page</h2>
      </div>

      <div className="payment">
        {
          !payDone ?
            <>
              <p>Please Pay the total amount <b>₹{totalPrice}</b> to <b>7897878788</b> via UPI</p>
              <IonButton className="ibutton" onClick={toggleSwitch}>Done</IonButton>
              <br />
              <img src="https://qr.io/blog/wp-content/uploads/2023/04/how-to-scan-a-qr-code-on-samsung-2-1024x681.jpg" alt="Payment QR Code" height={"200px"} />
            </>
            :
            <p> Thank you for Shopping</p>
           
        }

      </div>
    </>
  );
};

export default PaymentPage;