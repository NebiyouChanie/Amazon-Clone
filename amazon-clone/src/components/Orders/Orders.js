import React, { useEffect, useState } from 'react';
import Order from './Order';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firbase'; // Ensure the correct path to your firebase.js
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import './orders.css';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Reference to the orders collection for the current user
      const ordersRef = collection(db, 'users', user?.uid, 'orders');
      // Create a query to order documents by the 'created' field in descending order
      const q = query(ordersRef, orderBy('created', 'desc'));

      // Listen for real-time updates from Firestore
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Clean up the listener on component unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div>
      <h1>Your Orders</h1>
      <div className='orders_order'>
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
