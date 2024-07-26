import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { IonButton } from '@ionic/react';

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
        <>
            <div id='editConsultant' className='title2 title3'>
                <h2>{isEditing ? 'Edit Consultant' : 'Add Consultant'}</h2>
            </div>

            <div className="manageConsultants">
                <form className='addConsultants' onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdateConsultant() : handleAddConsultant(); }}>
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
                    <button type="button" onClick={editCredentialIndex !== null ? handleUpdateCredential : handleAddCredential}>
                        {editCredentialIndex !== null ? 'Update Credential' : 'Add Credential'}
                    </button>
                    <div>
                        <h3>{credentials.length === 0 ? '' : 'Credentials'}</h3>
                        <ul>
                            {credentials.map((cred, index) => (
                                <li key={index}>
                                    <div className="editBtnsAdmin">
                                    {cred}
                                    <button type="button" onClick={() => handleEditCredential(index)}>Edit</button>
                                    <button type="button" onClick={() => handleDeleteCredential(index)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit">
                        {isEditing ? 'Update Consultant' : 'Add Consultant'}
                    </button>
                </form>
            </div>

            <div className='title2 title3'>
                <h2>Consultants</h2>
            </div>

            <div className="deleteConsultants">
                {['physician', 'lifecoach'].map((cat) => (
                    <div key={cat}>
                        <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
                        <div className="consultantsCat">
                            {consultants[cat].map((consultant) => (
                                <div className='consultantsCard' key={consultant.id}>
                                    <img src={consultant.image} alt={consultant.name} />
                                    <p><strong>Name: </strong> {consultant.name}</p>
                                    <p><strong>Credentials: </strong> <ul>
                                        {Array.isArray(consultant.credentials) ? (
                                            consultant.credentials.map((credential, credIndex) => (
                                                <li key={credIndex}>{credential}</li>
                                            ))
                                        ) : (<li>No credentials available</li>)}
                                    </ul></p>
                                    <p><strong>Fees: </strong>{consultant.fees}</p>
                                    <IonButton className="ibuttonDel" onClick={() => handleDeleteConsultant(consultant.id)}>Delete Consultant</IonButton>
<a href="#editConsultant">
    <IonButton className="ibuttonEdit" onClick={() => handleEditConsultant(consultant)}>Modify Consultant</IonButton>
</a>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ManageConsultants;



