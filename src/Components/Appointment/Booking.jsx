import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { format, addDays } from 'date-fns';
import { IonContent, IonList, IonItem, IonLabel, IonRadio, IonRadioGroup, IonDatetime, IonButton, setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';

setupIonicReact();

const Availability = () => {
  const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [unavailability, setUnavailability] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchUnavailability = async (selectedDate) => {
    try {
      const q = query(
        collection(db, 'dietician_unavial'),
        where('date', '==', selectedDate)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setUnavailability(data);
    } catch (error) {
      console.error("Error fetching unavailability:", error);
    }
  };

  const generateTimeSlots = (start, end, interval) => {
    const slots = [];
    let current = new Date(start);

    while (current < end) {
      const next = new Date(current.getTime() + interval);
      slots.push({ start: new Date(current), end: new Date(next) });
      current = next;
    }

    return slots;
  };

  const calculateAvailability = () => {
    const startOfDay = new Date(`${date}T09:00:00`);
    const endOfDay = new Date(`${date}T17:00:00`);
    let availableSlots = generateTimeSlots(startOfDay, endOfDay, 30 * 60 * 1000);

    if (unavailability.length === 0) {
      setAvailability(availableSlots);
      return;
    }

    unavailability.forEach(({ start, end }) => {
      const startUnavailable = new Date(`${date}T${start}`);
      const endUnavailable = new Date(`${date}T${end}`);
      availableSlots = availableSlots.flatMap(slot => {
        if (endUnavailable <= slot.start || startUnavailable >= slot.end) {
          return [slot];
        }
        const newSlots = [];
        if (startUnavailable > slot.start) {
          newSlots.push({ start: slot.start, end: startUnavailable });
        }
        if (endUnavailable < slot.end) {
          newSlots.push({ start: endUnavailable, end: slot.end });
        }
        return newSlots;
      });
    });

    setAvailability(availableSlots);
  };

  const handleBookSlot = async () => {
    if (selectedSlot) {
      try {
        await addDoc(collection(db, 'booked_slots'), {
          date,
          start: format(selectedSlot.start, 'HH:mm'),
          end: format(selectedSlot.end, 'HH:mm')
        });
        await addDoc(collection(db, 'dietician_unavial'), {
          date,
          start: format(selectedSlot.start, 'HH:mm'),
          end: format(selectedSlot.end, 'HH:mm')
        });
        alert("Slot booked successfully!");
      } catch (error) {
        console.error("Error booking slot:", error);
        alert("Error booking slot. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (date) {
      fetchUnavailability(date);
    }
  }, [date]);

  useEffect(() => {
    if (date) {
      if (unavailability.length > 0) {
        calculateAvailability();
      } else {
        setAvailability(generateTimeSlots(new Date(`${date}T09:00:00`), new Date(`${date}T17:00:00`), 30 * 60 * 1000));
      }
    }
  }, [unavailability, date]);

  return (
    <IonContent>
    <h1>Dietician Availability</h1>
    <IonDatetime
      displayFormat="YYYY-MM-DD"
      min={format(new Date(), 'yyyy-MM-dd')}
      value={date}
      onIonChange={(e) => setDate(e.detail.value.split('T')[0])}
    />
    {availability.length > 0 && (
      <IonRadioGroup className="radio-group" value={selectedSlot} onIonChange={(e) => setSelectedSlot(e.detail.value)}>
        {availability.map((slot, index) => (
          <IonItem key={index} className="radio-item">
            <IonLabel className={`radio-label ${selectedSlot === slot ? 'selected' : ''}`}>
              {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
            </IonLabel>
            <input
              type="radio"
              className="radio-input"
              name="slot"
              value={index}
              checked={selectedSlot === slot}
              onChange={() => setSelectedSlot(slot)}
             />
          </IonItem>
        ))}
      </IonRadioGroup>
    )}
    {selectedSlot && (
      <IonButton onClick={handleBookSlot} style={{ marginTop: '20px' }}>Book Slot</IonButton>
    )}
  </IonContent>
  );
};

export default Availability