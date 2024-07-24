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
  const [alertAction, setAlertAction] = useState(() => () => {});
  const [editCategory, setEditCategory] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

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

  const handleUpdateProduct = async (product) => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        minimumQuantity: product.minimumQuantity,
        availableQuantity: product.availableQuantity,
        price: product.price
      });
      setProducts(products.map((p) =>
        p.id === product.id ? product : p
      ));
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
  };

  const handleSaveCategory = async () => {
    try {
      const categoryRef = doc(db, "categories", editCategory.id);
      await updateDoc(categoryRef, {
        name: editCategory.name,
        image: editCategory.image,
        text: editCategory.text,
      });
      setCategories(categories.map((category) =>
        category.id === editCategory.id ? editCategory : category
      ));
      setEditCategory(null);
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleSaveProduct = async () => {
    try {
      const productRef = doc(db, "products", editProduct.id);
      await updateDoc(productRef, {
        name: editProduct.name,
        text: editProduct.text,
        image: editProduct.image,
        categoryId: editProduct.categoryId,
        minimumQuantity: editProduct.minimumQuantity,
        availableQuantity: editProduct.availableQuantity,
        price: editProduct.price,
      });
      setProducts(products.map((product) =>
        product.id === editProduct.id ? editProduct : product
      ));
      setEditProduct(null);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product: ", error);
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
                <a href="#editCategory">
                <IonButton className="ibuttonEdit" onClick={() => handleEditCategory(category)}>
                  Modify Category
                </IonButton>
                </a>
              
            </div>
          </div>
        ))}
      </div>
      {editCategory && (
        <div className="editCategory" id='editCategory'>
          <h3>Edit Category</h3>
          <p>Name</p>
          <input
            type="text"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
            placeholder="Name"
          />
          <p>Image</p>
          <input
            type="text"
            value={editCategory.image}
            onChange={(e) => setEditCategory({ ...editCategory, image: e.target.value })}
            placeholder="Image URL"
          />
          <p>Text</p>
          <input
            type="text"
            value={editCategory.text}
            onChange={(e) => setEditCategory({ ...editCategory, text: e.target.value })}
            placeholder="Text"
          />
          <IonButton onClick={handleSaveCategory}>Save Category</IonButton>
        </div>
      )}
      <hr />
      <h2>Delete Products from Category</h2>
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
                  <a href="#editProduct">
                  <IonButton className="ibuttonEdit" onClick={() => handleEditProduct(product)}>
                    Modify Product
                  </IonButton>
                  </a>
                  
                </div>
              </div>
            ))}
            <IonButton className="ibuttonDel" onClick={handleDeleteProducts}>
              Delete All Products
            </IonButton>
          </div>
        )}
      </div>
      {editProduct && (
        <div className="editProduct" id='editProduct'>
          <h3>Edit Product</h3>
          <p>Name</p>
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            placeholder="Name"
          />
          <p>Text</p>
          <input
            type="text"
            value={editProduct.text}
            onChange={(e) => setEditProduct({ ...editProduct, text: e.target.value })}
            placeholder="Text"
          />
          <p>Image</p>
          <input
            type="text"
            value={editProduct.image}
            onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
            placeholder="Image URL"
          />
          <select
            value={editProduct.categoryId}
            onChange={(e) => setEditProduct({ ...editProduct, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p>Minumum Qunatity</p>
          <input
            type="number"
            value={editProduct.minimumQuantity}
            onChange={(e) => setEditProduct({ ...editProduct, minimumQuantity: parseInt(e.target.value, 10) })}
            placeholder="Minimum Quantity"
          />
          <p>Available Qunatity</p>
          <input
            type="number"
            value={editProduct.availableQuantity}
            onChange={(e) => setEditProduct({ ...editProduct, availableQuantity: parseInt(e.target.value, 10) })}
            placeholder="Available Quantity"
          />
          <p>Price</p>
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
            placeholder="Price"
          />
          <IonButton onClick={handleSaveProduct}>Save Product</IonButton>
        </div>
      )}
    </div>
  );
};

export default DeleteItems;
