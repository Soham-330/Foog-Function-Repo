import React from "react";
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, setupIonicReact } from '@ionic/react';
import FeedbackList from "./FeedbackList";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import DeleteItems from "./DeleteItems";

setupIonicReact();

const AdminPage = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Panel</IonTitle>
        </IonToolbar>
      </IonHeader>
        <h2>Add Category</h2>
        <AddCategory />
        <h2>Add Product</h2>
        <AddProduct />
        <h2>Delete Items</h2>
        <DeleteItems />
        <h2>Feedbacks</h2>
        <FeedbackList />
    </>
  );
};

export default AdminPage;
