import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

const DieticianSlotManager = () => {
  const [dieticians, setDieticians] = useState([]);
  const [selectedDietician, setSelectedDietician] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showAllSlots, setShowAllSlots] = useState(true);

  useEffect(() => {
    const fetchDieticians = async () => {
      const dieticiansCol = collection(db, 'dietician');
      const dieticiansSnapshot = await getDocs(dieticiansCol);
      setDieticians(dieticiansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDieticians();
  }, []);

  useEffect(() => {
    if (selectedDietician) {
      fetchBookedSlots();
    } else {
      setBookedSlots([]);
    }
  }, [selectedDietician, showAllSlots]);

  const fetchBookedSlots = async () => {
    const slotsCol = collection(db, 'booked_slots');
    let q = query(slotsCol, where('dieticianId', '==', selectedDietician));

    if (!showAllSlots) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      q = query(slotsCol, where('dieticianId', '==', selectedDietician), where('date', '>=', today.toISOString().split('T')[0]));
    }

    const slotsSnapshot = await getDocs(q);
    setBookedSlots(slotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDieticianChange = (event) => {
    setSelectedDietician(event.target.value);
  };

  const handleFreeSlot = async (slotId) => {
    const slotDoc = doc(db, 'booked_slots', slotId);
    await deleteDoc(slotDoc);
    setBookedSlots(bookedSlots.filter(slot => slot.id !== slotId));
  };

  const toggleSlotView = () => {
    setShowAllSlots(!showAllSlots);
  };

  return (
    <div>
      <h2>Select a Dietician</h2>
      <select value={selectedDietician} onChange={handleDieticianChange}>
        <option value="">Select a Dietician</option>
        {dieticians.map(dietician => (
          <option key={dietician.id} value={dietician.id}>
            {dietician.name}
          </option>
        ))}
      </select>

      {selectedDietician && (
        <div>
          <button onClick={toggleSlotView}>
            {showAllSlots ? 'Show Today and Future Slots' : 'Show All Slots'}
          </button>
          <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid black', marginTop: '10px', padding: '10px' }}>
            <h3>Booked Slots</h3>
            <ul>
              {bookedSlots.map(slot => (
                <li key={slot.id}>
                  {slot.date} - {slot.start} to {slot.end}
                  <button onClick={() => handleFreeSlot(slot.id)}>Free Slot</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DieticianSlotManager;