import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { setupIonicReact, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonImg } from "@ionic/react";

setupIonicReact();

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
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
        price,
        availableQuantity,
        minimumQuantity,
        categoryId: selectedCategory
      });
      const newProduct = { id: docRef.id, name, image, text, price, availableQuantity, minimumQuantity, categoryId: selectedCategory };
      setName("");
      setImage("");
      setText("");
      setPrice("");
      setAvailableQuantity("");
      setMinimumQuantity("");
      setSelectedCategory("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <>

      <div className="addItems">

        <h2>Add Product Items</h2>
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
          <input
            type="number"
            placeholder="Price per Quantity"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Available Quantity"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Minimum Quantity"
            value={minimumQuantity}
            onChange={(e) => setMinimumQuantity(e.target.value)}
            required
          />
          <br />
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


      </div>

    </>
  );
};

export default AddProduct;
