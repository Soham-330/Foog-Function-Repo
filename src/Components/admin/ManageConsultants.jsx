import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ManageConsultants = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [fees, setFees] = useState('');
  const [category, setCategory] = useState('physician');
  const [credential, setCredential] = useState('');
  const [credentials, setCredentials] = useState([]);
  const [consultants, setConsultants] = useState({ physician: [], lifecoach: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editCredentialIndex, setEditCredentialIndex] = useState(null);

  const handleAddConsultant = async () => {
    try {
      await addDoc(collection(db, 'dietician'), {
        name,
        image,
        fees: Number(fees),
        category,
        credentials,
      });
      alert('Consultant added successfully!');
      setName('');
      setImage('');
      setFees('');
      setCategory('physician');
      setCredentials([]);
      fetchConsultants();
    } catch (error) {
      console.error('Error adding consultant: ', error);
    }
  };

  const fetchConsultants = async () => {
    const categories = ['physician', 'lifecoach'];
    let consultantsData = { physician: [], lifecoach: [] };

    for (let cat of categories) {
      const q = query(collection(db, 'dietician'), where('category', '==', cat));
      const querySnapshot = await getDocs(q);
      consultantsData[cat] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
    setConsultants(consultantsData);
  };

  const handleDeleteConsultant = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultant?')) {
      try {
        await deleteDoc(doc(db, 'dietician', id));
        alert('Consultant deleted successfully!');
        fetchConsultants();
      } catch (error) {
        console.error('Error deleting consultant: ', error);
      }
    }
  };

  const handleEditConsultant = (consultant) => {
    setIsEditing(true);
    setEditId(consultant.id);
    setName(consultant.name);
    setImage(consultant.image);
    setFees(consultant.fees);
    setCategory(consultant.category);
    setCredentials(consultant.credentials);
  };

  const handleAddCredential = () => {
    if (credential !== '') {
      const newCredentials = credential.split('.').map(cred => cred.trim()).filter(cred => cred !== '');
      setCredentials([...credentials, ...newCredentials]);
    }
    setCredential('');
  };
  
  const handleUpdateCredential = () => {
    if (credential !== '') {
      const updatedCredentials = credential.split('.').map(cred => cred.trim()).filter(cred => cred !== '');
      const currentCredentials = [...credentials];
      currentCredentials.splice(editCredentialIndex, 1, ...updatedCredentials);
      setCredentials(currentCredentials);
      setCredential('');
      setEditCredentialIndex(null);
    }
  };
  
  const handleEditCredential = (index) => {
    setEditCredentialIndex(index);
    setCredential(credentials[index]);
  };
  
  const handleDeleteCredential = (index) => {
    const updatedCredentials = credentials.filter((_, i) => i !== index);
    setCredentials(updatedCredentials);
  };

  const handleUpdateConsultant = async () => {
    try {
      await updateDoc(doc(db, 'dietician', editId), {
        name,
        image,
        fees: Number(fees),
        category,
        credentials,
      });
      alert('Consultant updated successfully!');
      setName('');
      setImage('');
      setFees('');
      setCategory('physician');
      setCredentials([]);
      setIsEditing(false);
      setEditId(null);
      fetchConsultants();
    } catch (error) {
      console.error('Error updating consultant: ', error);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  return (
    <div>
      <h2>{isEditing ? 'Edit Consultant' : 'Add Consultant'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdateConsultant() : handleAddConsultant(); }}>
        <p>Name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <p>Image URL</p>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
        <p>Fees</p>
        <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="Fees" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="physician">Physician</option>
          <option value="lifecoach">Life Coach</option>
        </select>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Credential (use '.' as separator)"
        />
        <button type="button" onClick={handleAddCredential}>Add Credential</button>
        <div>
        <h3>{credentials.length === 0 ? `` : `Credentials`}</h3>
        <ul>
          {credentials.map((cred, index) => (
            <li key={index}>
              {cred}
              <button type="button" onClick={() => handleEditCredential(index)}>Edit</button>
              <button type="button" onClick={() => handleDeleteCredential(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={editCredentialIndex !== null ? handleUpdateCredential : handleAddCredential}>
        {editCredentialIndex !== null ? 'Update Credential' : 'Add Credential'}
      </button>
      </form>

      <h2>Consultants</h2>
      {['physician', 'lifecoach'].map((cat) => (
        <div key={cat}>
          <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
          {consultants[cat].map((consultant) => (
            <div key={consultant.id}>
              <p>Name: {consultant.name}</p>
              <img src={consultant.image} alt={consultant.name} width="100" />
              <p>Fees: {consultant.fees}</p>
              <p>Credentials: {consultant.credentials.join(', ')}</p>
              <button onClick={() => handleDeleteConsultant(consultant.id)}>Delete Consultant</button>
              <button onClick={() => handleEditConsultant(consultant)}>Modify Consultant</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ManageConsultants;
