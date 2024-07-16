import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';



const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
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

  const modifyQuantity = async (id) => {
    const orderDoc = doc(db, 'orders', id);
    await updateDoc(orderDoc, { quantity: parseInt(newQuantity, 10) });
    setEditOrderId(null);
    setNewQuantity('');
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
    <div className='manageOrders' >
      <button className='toggleBtns' onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Show Incomplete Orders' : 'Show Completed Orders'}
      </button>
      <div className='orders'>
      <ul>
        {orders.map(order => (
          <div className="order">
          <li key={order.id}>
            <p>Name: {order.name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Address: {order.address}</p>
            <p>Completed: {order.isCompleted ? 'Yes' : 'No'}</p>
            {editOrderId === order.id ? (
              <>
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
                <button className='toggleBtns' onClick={() => modifyQuantity(order.id)}>Save</button>
                <button className='toggleBtns' onClick={() => setEditOrderId(null)}>Cancel</button>
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
