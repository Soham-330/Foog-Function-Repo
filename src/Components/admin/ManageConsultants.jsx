import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';


const ManageConsultants = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [fees, setFees] = useState('');
    const [category, setCategory] = useState('physician');
    const [credential, setCredential] = useState('');
    const [credentials, setCredentials] = useState([]);
    const [consultants, setConsultants] = useState({ physician: [], lifecoach: [] });

    const handleAddCredential = () => {
        setCredentials([...credentials, credential]);
        if (credential !== '') {
            setCredentials([...credentials, credential]);
        }
        setCredential('');
    };

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

    useEffect(() => {
        fetchConsultants();
    }, []);

    return (
        <>
            <div className='title2 title3'>
                <h2>Add Consultant</h2>
            </div>

            <div className="manageConsultants">


                <div className='addConsultants'>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddConsultant(); }}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
                        <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="Fees" required />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="physician">Physician</option>
                            <option value="lifecoach">Life Coach</option>
                        </select>
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            placeholder="Credential"
                        />
                        <button type="button" onClick={handleAddCredential}>Add Credential</button>
                        <div>
                            <h3>{credentials.length === 0 ? `` : `Credentials`}</h3>
                            <ul>
                                {credentials.map((cred, index) => (
                                    <li key={index}>{cred}</li>
                                ))}
                            </ul>
                        </div>
                        <button type="submit">Add Consultant</button>
                    </form>
                </div>
            </div>

            <strong></strong>
            <div className='title2 title3'>
                <h2>Delete Consultant</h2>
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
                                    <button onClick={() => handleDeleteConsultant(consultant.id)}>Delete Consultant</button>
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