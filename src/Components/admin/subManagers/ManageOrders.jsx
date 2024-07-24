import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPaid, setShowPaid] = useState(false);
  const [sortType, setSortType] = useState('time-asc');
  const [currentFilter, setCurrentFilter] = useState('Time (Ascending)');

  useEffect(() => {
    fetchOrders();
  }, [showCompleted, showPaid, sortType]);

  const fetchOrders = async () => {
    let q = query(collection(db, 'orders'));

    if (showCompleted) {
      q = query(q, where('isCompleted', '==', true));
    } else {
      q = query(q, where('isCompleted', '==', false));
    }

    if (showPaid) {
      q = query(q, where('paid', '==', true));
    }

    const querySnapshot = await getDocs(q);
    let fetchedOrders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (sortType === 'time-asc') {
      fetchedOrders = fetchedOrders.sort((a, b) => a.time - b.time);
      setCurrentFilter('Time (Ascending)');
    } else if (sortType === 'time-desc') {
      fetchedOrders = fetchedOrders.sort((a, b) => b.time - a.time);
      setCurrentFilter('Time (Descending)');
    } else if (sortType === 'price-asc') {
      fetchedOrders = fetchedOrders.sort((a, b) => a.totalPrice - b.totalPrice);
      setCurrentFilter('Price (Ascending)');
    } else if (sortType === 'price-desc') {
      fetchedOrders = fetchedOrders.sort((a, b) => b.totalPrice - a.totalPrice);
      setCurrentFilter('Price (Descending)');
    }

    setOrders(fetchedOrders);
  };

  const togglePaid = async (orderId, isPaid, items) => {
    const orderDoc = doc(db, 'orders', orderId);
    const newPaidStatus = !isPaid;
    await updateDoc(orderDoc, { paid: newPaidStatus });

    items.forEach(async (item) => {
      const productName = item.split(' - ')[0].trim();
      const productQuantity = parseInt(item.split(' - ')[1].split(' * ')[0].trim(), 10);

      const productQuery = query(collection(db, 'products'), where('name', '==', productName));
      const productSnapshot = await getDocs(productQuery);
      if (!productSnapshot.empty) {
        const productDoc = productSnapshot.docs[0];
        const productData = productDoc.data();
        if (newPaidStatus) {
          await updateDoc(productDoc.ref, {
            availableQuantity: productData.availableQuantity - productQuantity
          });
          alert(`The Available Quantity of ${productName}: Decreased by ${productQuantity}`);
        } else {
          await updateDoc(productDoc.ref, {
            availableQuantity: productData.availableQuantity + productQuantity
          });
          alert(`The Available Quantity of ${productName}: Increased by ${productQuantity}`);
        }
      }
    });

    fetchOrders();
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

  const toggleSort = (type) => {
    if (type === 'time') {
      setSortType((prevSortType) => (prevSortType === 'time-asc' ? 'time-desc' : 'time-asc'));
    } else if (type === 'price') {
      setSortType((prevSortType) => (prevSortType === 'price-asc' ? 'price-desc' : 'price-asc'));
    }
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
        <button className='toggleBtns' onClick={() => setShowPaid(!showPaid)}>
          {showPaid ? 'Show Unpaid Orders' : 'Show Paid Orders'}
        </button>
        <button className='toggleBtns' onClick={() => toggleSort('time')}>
          Sort by Time {sortType.includes('time-asc') ? '(Descending)' : '(Ascending)'}
        </button>
        <button className='toggleBtns' onClick={() => toggleSort('price')}>
          Sort by Price {sortType.includes('price-asc') ? '(Descending)' : '(Ascending)'}
        </button>
        <p>Current sorting: {currentFilter}</p>
        <h2>{showCompleted ? 'Completed Orders' : 'Pending Orders'}</h2>
        <div className='orders'>
          <ul>
            {orders.map(order => (
              <div className="order" key={order.id}>
                <li>
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Phone Number:</strong> {order.number}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <ul>
                    Items:
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </ul>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                  <p><strong>Order Status:</strong> {order.isCompleted ? "Completed" : "Pending"}</p>
                  <p><strong>Paid Status:</strong> {order.paid ? "Paid" : "Unpaid"}</p>
                  <button className='toggleBtns' onClick={() => toggleCompletion(order.id, order.isCompleted)}>
                    Mark as {order.isCompleted ? 'Incomplete' : 'Complete'}
                  </button>
                  <button className='toggleBtns' onClick={() => togglePaid(order.id, order.paid, order.items)}>
                    Mark as {order.paid ? 'Unpaid' : 'Paid'}
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
