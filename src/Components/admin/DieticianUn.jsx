import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { IonSelect, IonSelectOption, IonAlert, IonItem, IonLabel, IonInput, IonButton, IonDatetime, setupIonicReact } from '@ionic/react';
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";

setupIonicReact();

const AdminAvailability = () => {
  const [dieticians, setDieticians] = useState([]);
  const [selectedDietician, setSelectedDietician] = useState('');
  const [date, setDate] = useState(format(addDays(new Date(),0), 'yyyy-MM-dd'));
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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

  const handleConfirm = () => {
    setShowAlert(true);
  };

  const confirmAddUnavailability = () => {
    handleAddUnavailability();
    setShowAlert(false);
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
              presentation="date"
            />
          </IonItem>
          <IonItem className="admin-item ion-no-padding">
            <IonLabel>Start Time:</IonLabel>
            <IonInput
              type="time"
              value={start}
              onIonChange={(e) => setStart(e.detail.value)}
              className="time-input"
            />
          </IonItem>
          <IonItem className="admin-item ion-no-padding">
            <IonLabel>End Time:</IonLabel>
            <IonInput
              type="time"
              value={end}
              onIonChange={(e) => setEnd(e.detail.value)}
              className="time-input"
            />
          </IonItem>
          <div className="button0">
          <IonButton className="admin-button" onClick={handleConfirm}>Add Unavailability</IonButton>
          <IonAlert
            isOpen={showAlert && !(!selectedDietician || !date || !start || !end)}
            onDidDismiss={() => setShowAlert(false)}
            header={'Confirm Unavailability'}
            message={`Dietician: ${dieticians.find(d => d.id === selectedDietician)?.name}, Date: ${date}, Start Time: ${start}, End Time: ${end}`}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  setShowAlert(false);
                }
              },
              {
                text: 'Confirm',
                handler: confirmAddUnavailability
              }
            ]}
          />
          </div>
        
        </div>
      </div>
    </>
  );
};

export default AdminAvailability;