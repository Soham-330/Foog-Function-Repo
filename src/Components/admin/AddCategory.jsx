import { useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { setupIonicReact, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonImg } from "@ionic/react";
setupIonicReact();

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [recentCategories, setRecentCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "categories"), {
        name,
        image,
        text
      });
      const newCategory = { name, image, text, };
      setRecentCategories([newCategory, ...recentCategories]);
      setName("");
      setImage("");
      setText("");
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  return (
    <>
      <div className="addItems">
        <h2>Add Category Items</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <br />
          <button type="submit">Add Category</button>
        </form>


      </div>

    </>
  );
};

export default AddCategory;
