import React, { useState, useEffect } from "react";

import { collection, getDocs, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore";
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,
  IonCardTitle, IonButton, IonAlert, setupIonicReact
} from "@ionic/react";
import { db } from "../../../../firebase";
setupIonicReact();

const DeleteItems = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertAction, setAlertAction] = useState(() => () => { });
  const [minQty, setMinQty] = useState(0);
  const [availQty, setAvailQty] = useState(0);
  const [price, setPrice] = useState(0);

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

  const handleUpdateMinQty = async (productId, newQty) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { minimumQuantity: newQty });
      setProducts(products.map((product) =>
        product.id === productId ? { ...product, minimumQuantity: newQty } : product
      ));
      alert("Minimum Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating minimum quantity: ", error);
    }
  };

  const handleUpdateAvailQty = async (productId, newQty) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { availableQuantity: newQty });
      setProducts(products.map((product) =>
        product.id === productId ? { ...product, availableQuantity: newQty } : product
      ));
      alert("Available Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating available quantity: ", error);
    }
  };

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

  const handleUpdatePrice = async (productId, newPrice) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { price: newPrice });
      setProducts(products.map((product) =>
        product.id === productId ? { ...product, price: newPrice } : product
      ));
      alert("Price updated successfully!");
    } catch (error) {
      console.error("Error updating price: ", error);
    }
  };

  return (
    <div className="delContainer">
      <div className='title2 title3'>
        <h2>Delete Items</h2>
      </div>
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
            <div className="catImg">
              <img alt={`Image of ${category.name}`} src={category.image} />
            </div>
            <h3>{category.name}</h3>
            <div className="catText">
              {category.text}
            </div>
            <div>
              <IonButton className="ibuttonDel" onClick={() => handleDeleteCategory(category.id)}>
                Delete Category
              </IonButton>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <h2>Delete/Modify Products from Category</h2>
      <div className="delPro">
        <select className="selectBtn" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {products.length > 0 && (
          <div className="delPro">
            {products.map((product) => (
              <div className="catCard" key={product.id}>
                <div className="catImg">
                  <img alt={`Image of ${product.name}`} src={product.image} />
                </div>
                <h3>{product.name}</h3>
                <div className="catText">
                  {product.text}
                </div>
                <div>
                  <IonButton className="ibuttonDel" onClick={() => handleDeleteProduct(product.id)}>
                    Delete Product
                  </IonButton>
                </div>
                <div>
                  <label>Min Quantity:</label>
                  <input
                    type="number"
                    value={minQty}
                    onChange={(e) => setMinQty(parseInt(e.target.value, 10))}
                  />
                  <IonButton onClick={() => handleUpdateMinQty(product.id, minQty)}>
                    Update Min Quantity
                  </IonButton>
                </div>
                <div>
                  <label>Available Quantity:</label>
                  <input
                    type="number"
                    value={availQty}
                    onChange={(e) => setAvailQty(parseInt(e.target.value, 10))}
                  />
                  <IonButton onClick={() => handleUpdateAvailQty(product.id, availQty)}>
                    Update Available Quantity
                  </IonButton>
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                  <IonButton onClick={() => handleUpdatePrice(product.id, price)}>
                    Update Price
                  </IonButton>
                </div>
              </div>
            ))}
            <IonButton className="ibuttonDel" onClick={handleDeleteProducts}>
              Delete All Products
            </IonButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteItems;
