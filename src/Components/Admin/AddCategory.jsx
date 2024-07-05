import { useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { setupIonicReact, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonImg } from "@ionic/react";
setupIonicReact();

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "categories"), {
        name,
        image,
        text
      });
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
      <button type="submit">Add Category</button>
    </form>
    </>
  );
};

export default AddCategory;
