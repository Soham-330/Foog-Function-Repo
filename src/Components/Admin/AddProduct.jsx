import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { setupIonicReact, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonImg } from "@ionic/react";

setupIonicReact();

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name,
        image,
        text,
        categoryId: selectedCategory
      });
      const newProduct = { id: docRef.id, name, image, text, categoryId: selectedCategory };
      setRecentProducts([newProduct, ...recentProducts]);
      setName("");
      setImage("");
      setText("");
      setSelectedCategory("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Product Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Product Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Product</button>
    </form>
    <h3>Recently Added Products</h3>
      {recentProducts.map((product) => (
        <IonCard key={product.id}>
          <img src={product.image} height='200px' />
          <IonCardHeader>
            <IonCardTitle>{product.name}</IonCardTitle>
            <IonCardSubtitle>{product.text}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{product.text}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default AddProduct;
