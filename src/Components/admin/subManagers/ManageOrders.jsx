import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';



const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [showCompleted]);

  const fetchOrders = async () => {
    const q = query(
      collection(db, 'orders'),
      where('isCompleted', '==', showCompleted)
    );

    const querySnapshot = await getDocs(q);
    const fetchedOrders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setOrders(fetchedOrders);
  };

  const modifyQuantity = async (orderId, itemIndex) => {
    const order = orders.find(order => order.id === orderId);
    const updatedItems = [...order.items];
    const itemParts = updatedItems[itemIndex].split(' - ');
    const productDetails = itemParts[1].split(' * ');
    const currentQuantity = productDetails[0];
    const itemPrice = productDetails[1].split(' = ')[0];

    if (parseInt(newQuantity, 10) === 0) {
      // Remove the item from the items array
      updatedItems.splice(itemIndex, 1);
    } else {
      // Update the item quantity
      updatedItems[itemIndex] = `${itemParts[0]} - ${newQuantity} * ${itemPrice} = ${parseInt(newQuantity, 10) * parseFloat(itemPrice.replace('₹', ''))}`;
    }

    //Calculating total price
    const newTotalPrice = updatedItems.reduce((total, item) => {
      const itemDetails = item.split(' - ')[1].split(' * ');
      const quantity = parseInt(itemDetails[0], 10);
      const price = parseFloat(itemDetails[1].split(' = ')[0].replace('₹', ''));
      return total + (quantity * price);
    }, 0);

    const orderDoc = doc(db, 'orders', orderId);
    await updateDoc(orderDoc, {
      items: updatedItems,
      totalPrice: newTotalPrice,
    });

    setEditOrderId(null);
    setSelectedItemIndex(null);
    setNewQuantity('');
    alert('Updated the Quantity Successfully!');
    fetchOrders(); // Refresh the list
  };

  const deleteOrder = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      const orderDoc = doc(db, 'orders', id);
      await deleteDoc(orderDoc);
      fetchOrders(); // Refresh the list
    }
  };

  const toggleCompletion = async (id, isCompleted) => {
    const orderDoc = doc(db, 'orders', id);
    await updateDoc(orderDoc, { isCompleted: !isCompleted });
    fetchOrders(); // Refresh the list
    window.confirm('The Order is completed')
  };

  return (
    <>

      <div className='title2 title3'>
        <h2>Manage Orders</h2>
      </div>
      <div className='manageOrders'>
        <button className='toggleBtns' onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? 'Show Pending Orders' : 'Show Completed Orders'}
        </button>
        <h2>{showCompleted ? 'Completed Orders' : 'Pending Orders'}</h2>
        <div className='orders'>
          <ul>
            {orders.map(order => (
              <div className="order" key={order.id}>
                <li>
                  <p><strong>Order Id: </strong>{order.id}</p>
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Phone Number:</strong> {order.number}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p>


                    <strong>Items:</strong>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </p>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                  <p><strong>Order Status:</strong> {order.isCompleted ? "Completed" : "Pending"}</p>
                  {editOrderId === order.id ? (
                    <>
                      <select
                        onChange={(e) => setSelectedItemIndex(e.target.value)}
                        value={selectedItemIndex}
                      >
                        <option value={null}>Select Item</option>
                        {order.items.map((item, index) => (
                          <option key={index} value={index}>
                            {item.split(' - ')[0]}
                          </option>
                        ))}
                      </select>
                      {selectedItemIndex !== null && (
                        <>
                          <input
                            type="number"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                          />
                          <button className='toggleBtns' onClick={() => modifyQuantity(order.id, selectedItemIndex)}>Save</button>
                          <button className='toggleBtns' onClick={() => setEditOrderId(null)}>Cancel</button>
                        </>
                      )}
                    </>
                  ) : (
                    <button className='toggleBtns' onClick={() => setEditOrderId(order.id)}>Modify Quantity</button>
                  )}
                  <button className='toggleBtns' onClick={() => toggleCompletion(order.id, order.isCompleted)}>
                    Mark as {order.isCompleted ? 'Incomplete' : 'Complete'}
                  </button>
                  <button className='toggleBtns' onClick={() => deleteOrder(order.id)}>Delete Order</button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderManager;
