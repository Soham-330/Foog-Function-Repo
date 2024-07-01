import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { IonSelect, IonSelectOption, IonItem, IonLabel, IonInput, IonButton, IonDatetime, setupIonicReact } from '@ionic/react';
import { useEffect, useState } from "react";

setupIonicReact();

const AdminAvailability = () => {
  const [dieticians, setDieticians] = useState([]);
  const [selectedDietician, setSelectedDietician] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    const fetchDieticians = async () => {
      const dieticiansSnapshot = await getDocs(collection(db, 'dietician'));
      const dieticiansList = dieticiansSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDieticians(dieticiansList);
    };

    fetchDieticians();
  }, []);

  const handleAddUnavailability = async () => {
    if (!selectedDietician || !date || !start || !end) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'dietician_unavial'), {
        dieticianId: selectedDietician,
        date,
        start,
        end
      });
      alert('Unavailability slot added successfully!');
      setSelectedDietician('');
      setDate('');
      setStart('');
      setEnd('');
    } catch (error) {
      console.error("Error adding unavailability:", error);
      alert('Error adding unavailability. Please try again.');
    }
  };

  return (
    <>
      <div className='title2 title3'>
        <h2>Admin: Add Unavailability</h2>
      </div>
      <div className="doc-unavail">


        <div className="timings0">
          <IonItem className="admin-item">
            <IonLabel>Dietician:</IonLabel>
            <IonSelect value={selectedDietician} placeholder="Select Dietician" onIonChange={(e) => setSelectedDietician(e.detail.value)}>
              {dieticians.map((dietician) => (
                <IonSelectOption key={dietician.id} value={dietician.id}>{dietician.name}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem className="admin-item">
            <IonLabel>Date:</IonLabel>
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              value={date}
              onIonChange={(e) => setDate(e.detail.value.split('T')[0])}
            />
          </IonItem>
          <IonItem className="admin-item">
            <IonLabel>Start Time:</IonLabel>
            <IonInput
              type="time"
              value={start}
              onIonChange={(e) => setStart(e.detail.value)}
            />
          </IonItem>
          <IonItem className="admin-item">
            <IonLabel>End Time:</IonLabel>
            <IonInput
              type="time"
              value={end}
              onIonChange={(e) => setEnd(e.detail.value)}
            />
          </IonItem>
          <div className="button0">
            <IonButton className="ibutton3" onClick={handleAddUnavailability}>Add Unavailability</IonButton>
          </div>
        
        </div>


      </div>

    </>
  );
};

export default AdminAvailability;