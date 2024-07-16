// import React, { useState, useEffect } from 'react';
// import { collection, getDocs,getDoc, query, where, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
// import { format, addDays } from 'date-fns';
// import { db } from '../../../firebase';

// const DieticianSlotManager = () => {
//   const [dieticians, setDieticians] = useState([]);
//   const [selectedDietician, setSelectedDietician] = useState('');
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [showAllSlots, setShowAllSlots] = useState(true);
//   const [showCompletedSlots, setShowCompletedSlots] = useState(false);
//   const [showReschedule, setShowReschedule] = useState(false);
//   const [rescheduleSlotId, setRescheduleSlotId] = useState(null);
//   const [rescheduleDate, setRescheduleDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
//   const [rescheduleTimeSlots, setRescheduleTimeSlots] = useState([]);
//   const [selectedRescheduleSlot, setSelectedRescheduleSlot] = useState(null);

//   useEffect(() => {
//     const fetchDieticians = async () => {
//       const dieticiansCol = collection(db, 'dietician');
//       const dieticiansSnapshot = await getDocs(dieticiansCol);
//       setDieticians(dieticiansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     fetchDieticians();
//   }, []);

//   useEffect(() => {
//     if (selectedDietician) {
//       fetchBookedSlots();
//     } else {
//       setBookedSlots([]);
//     }
//   }, [selectedDietician, showAllSlots, showCompletedSlots]);

//   useEffect(() => {
//     if (showReschedule && selectedDietician) {
//       handleRescheduleSlot(rescheduleSlotId);
//     }
//   }, [rescheduleDate, showReschedule, selectedDietician]);

//   const fetchBookedSlots = async () => {
//     const slotsCol = collection(db, 'booked_slots');
//     let q = query(slotsCol, where('dieticianId', '==', selectedDietician), where('isCompleted', '==', showCompletedSlots));

//     if (!showAllSlots) {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       q = query(q, where('date', '>=', today.toISOString().split('T')[0]));
//     }

//     const slotsSnapshot = await getDocs(q);
//     setBookedSlots(slotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   };

//   const handleDieticianChange = (event) => {
//     setSelectedDietician(event.target.value);
//   };

//   const handleDeleteSlot = async (slotId) => {
//     const confirm = window.confirm("Are you sure you want to delete this slot?");
//     if (confirm) {
//       const slotDoc = doc(db, 'booked_slots', slotId);
//       await deleteDoc(slotDoc);
//       setBookedSlots(bookedSlots.filter(slot => slot.id !== slotId));
//     }
//   };

//   const handleCompleteSlot = async (slotId, currentStatus) => {
//     const slotDoc = doc(db, 'booked_slots', slotId);
//     await updateDoc(slotDoc, { isCompleted: !currentStatus });
//     setBookedSlots(bookedSlots.filter(slot => slot.id !== slotId));
//   };

//   const handleRescheduleSlot = async (slotId) => {
//     setShowReschedule(true);
//     setRescheduleSlotId(slotId);

//     // Fetch unavailability of the dietician
//     const unavailQuery = query(collection(db, 'dietician_unavail'), where('dieticianId', '==', selectedDietician));
//     const unavailSnapshot = await getDocs(unavailQuery);
//     const unavailability = unavailSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     // Calculate available time slots
//     const date = new Date(rescheduleDate);
//     date.setHours(9, 0, 0, 0);
//     const endOfDay = new Date(date);
//     endOfDay.setHours(17, 0, 0, 0);

//     let availableSlots = generateTimeSlots(date, endOfDay, 30 * 60 * 1000);
//     unavailability.forEach(({ start, end }) => {
//       const startUnavailable = new Date(`${rescheduleDate}T${start}`);
//       const endUnavailable = new Date(`${rescheduleDate}T${end}`);
//       availableSlots = availableSlots.filter(slot => endUnavailable <= slot.start || startUnavailable >= slot.end);
//     });

//     setRescheduleTimeSlots(availableSlots);
//   };

//   const generateTimeSlots = (start, end, interval) => {
//     const slots = [];
//     let current = new Date(start);

//     while (current < end) {
//       const next = new Date(current.getTime() + interval);
//       slots.push({ start: new Date(current), end: new Date(next) });
//       current = next;
//     }

//     return slots;
//   };

//   const handleRescheduleSubmit = async () => {
//     if (rescheduleSlotId && selectedRescheduleSlot) {
//       try {
//         // Get the old slot data
//         const slotDoc = doc(db, 'booked_slots', rescheduleSlotId);
//         const slotDocData = (await getDoc(slotDoc)).data();

//         // Update the booked_slots collection with new date and time
//         await updateDoc(slotDoc, {
//           date: rescheduleDate,
//           start: format(selectedRescheduleSlot.start, 'HH:mm'),
//           end: format(selectedRescheduleSlot.end, 'HH:mm')
//         });

//         // Fetch and delete the old instance from dietician_unavail
//         const oldSlotQuery = query(
//           collection(db, 'dietician_unavail'),
//           where('dieticianId', '==', selectedDietician),
//           where('date', '==', slotDocData.date),
//           where('start', '==', slotDocData.start),
//           where('end', '==', slotDocData.end)
//         );
//         const oldSlotSnapshot = await getDocs(oldSlotQuery);
//         oldSlotSnapshot.docs.forEach(async (doc) => {
//           await deleteDoc(doc.ref);
//         });

//         // Add new instance to dietician_unavail
//         await addDoc(collection(db, 'dietician_unavail'), {
//           date: rescheduleDate,
//           start: format(selectedRescheduleSlot.start, 'HH:mm'),
//           end: format(selectedRescheduleSlot.end, 'HH:mm'),
//           dieticianId: selectedDietician
//         });

//         // Close the reschedule view and refresh booked slots
//         setShowReschedule(false);
//         fetchBookedSlots();
//       } catch (error) {
//         console.error('Error during rescheduling:', error);
//       }
//     }
//   };

//   const toggleSlotView = () => {
//     setShowAllSlots(!showAllSlots);
//   };

//   const toggleCompletedSlotsView = () => {
//     setShowCompletedSlots(!showCompletedSlots);
//   };

//   return (
//     <div>
//       <h2>Select a Dietician</h2>
//       <select value={selectedDietician} onChange={handleDieticianChange}>
//         <option value="">Select a Dietician</option>
//         {dieticians.map(dietician => (
//           <option key={dietician.id} value={dietician.id}>
//             {dietician.name}
//           </option>
//         ))}
//       </select>

//       {selectedDietician && (
//         <div>
//           <button onClick={toggleSlotView}>
//             {showAllSlots ? 'Show Today and Future Slots' : 'Show All Slots'}
//           </button>
//           <button onClick={toggleCompletedSlotsView}>
//             {showCompletedSlots ? 'Show Incomplete Slots' : 'Show Completed Slots'}
//           </button>
//           <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid black', marginTop: '10px', padding: '10px' }}>
//             <h3>Booked Slots</h3>
//             <ul>
//               {bookedSlots.map(slot => (
//                 <li key={slot.id}>
//                   {slot.date} - {slot.start} to {slot.end}
//                   <p>{`Name: ${slot.name}, Mobile Number: ${slot.mobileNumber}, Email: ${slot.email}`}</p>
//                   <p>{`Age: ${slot.age}, Gender: ${slot.gender}`}</p>
//                   <button onClick={() => handleCompleteSlot(slot.id, slot.isCompleted)}>
//                     {slot.isCompleted ? 'Mark as Incomplete' : 'Complete Slot'}
//                   </button>
//                   <button onClick={() => handleDeleteSlot(slot.id)}>Delete Slot</button>
//                   <button onClick={() => handleRescheduleSlot(slot.id)}>Reschedule Slot</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}

//       {showReschedule && (
//         <div>
//           <h3>Reschedule Slot</h3>
//           <label>
//             Select Date:
//             <input type="date" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} />
//           </label>
//           <div>
//             <h4>Available Time Slots</h4>
//             <ul>
//               {rescheduleTimeSlots.map((slot, index) => (
//                 <li key={index} onClick={() => setSelectedRescheduleSlot(slot)} style={{
//                   cursor: 'pointer',
//                   padding: '10px',
//                   border: '1px solid #ccc',
//                   margin: '5px 0',
//                   borderRadius: '5px',
//                   backgroundColor: selectedRescheduleSlot === slot ? '#007bff' : '#f8f9fa',
//                   color: selectedRescheduleSlot === slot ? '#fff' : '#000'
//                 }}>
//                   {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <button onClick={handleRescheduleSubmit}>Confirm Reschedule</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DieticianSlotManager;
