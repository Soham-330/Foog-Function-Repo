import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,
  IonCardTitle, IonButton, IonAlert, setupIonicReact
} from "@ionic/react";
setupIonicReact();

const DeleteItems = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertAction, setAlertAction] = useState(() => () => { });

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId) => {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("categoryId", "==", categoryId));
    const productsSnapshot = await getDocs(q);
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(productsList);
  };

  const handleDeleteCategory = async (categoryId) => {
    setAlertMessage("Are you sure you want to delete this category?");
    setAlertAction(() => async () => {
      try {
        await deleteDoc(doc(db, "categories", categoryId));
        setCategories(categories.filter((category) => category.id !== categoryId));
        alert("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category: ", error);
      }
    });
    setShowAlert(true);
  };

  const handleDeleteProduct = async (productId) => {
    setAlertMessage("Are you sure you want to delete this product?");
    setAlertAction(() => async () => {
      try {
        await deleteDoc(doc(db, "products", productId));
        setProducts(products.filter((product) => product.id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    });
    setShowAlert(true);
  };

  const handleDeleteProducts = async () => {
    setAlertMessage("Are you sure you want to delete all products in this category?");
    setAlertAction(() => async () => {
      try {
        const batch = db.batch();
        products.forEach((product) => {
          const productRef = doc(db, "products", product.id);
          batch.delete(productRef);
        });
        await batch.commit();
        setProducts([]);
        alert("Products deleted successfully!");
      } catch (error) {
        console.error("Error deleting products: ", error);
      }
    });
    setShowAlert(true);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  return (
    <div>
      <h1>Delete Items</h1>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Confirm Deletion'}
        message={alertMessage}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setShowAlert(false);
            }
          },
          {
            text: 'Delete',
            handler: alertAction
          }
        ]}
      />
      <h2>Delete Category</h2>

      <div className="cat-body">
        {categories.map((category) => (
          <div className="catCard" key={category.id}>
            <img src={category.image} height='200px' />
            <h2>
              <h3>{category.name}</h3>
              <p>{category.text}</p>
            </h2>
            <div>
              <IonButton color="danger" onClick={() => handleDeleteCategory(category.id)}>
                Delete Category
              </IonButton>
            </div>
          </div>
        ))}
      </div>
      <h3>Delete Products from Category</h3>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {products.length > 0 && (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.image} height='200px' />
              <h2>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </h2>
              <div>
                <IonButton color="danger" onClick={() => handleDeleteProduct(product.id)}>
                  Delete Product
                </IonButton>
              </div>
            </div>
          ))}
          <IonButton color="danger" onClick={handleDeleteProducts}>
            Delete All Products
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default DeleteItems;
