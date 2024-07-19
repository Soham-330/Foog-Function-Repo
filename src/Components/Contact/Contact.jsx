import { IonButton, setupIonicReact } from '@ionic/react'

import { db } from '../../../firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, query, where } from 'firebase/firestore';
setupIonicReact();


function Contact() {

    const [feedbackList, setFeedbackList] = useState([]);
    const feedbackCollectionRef = collection(db, "feedback")

    useEffect(() => {
        const getFeedbackList = async () => {

            const data = await getDocs(feedbackCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setFeedbackList(filteredData);
        }
            getFeedbackList();
    }, [])

    const [newFeedback, setFeedback] = useState("");

    const [newEmail, setEmail] = useState("");

    const onContactUs = async () => {
        const currentTimestamp = new Date();
        await addDoc(feedbackCollectionRef, {
            numemail: newEmail,
            text: newFeedback,
            timestamp: currentTimestamp,
        });
    }

    const [message, setMessage] = useState('');

    const validateInput = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!(emailRegex.test(newEmail) || phoneRegex.test(newEmail))) {
            alert('Please enter a valid Email or Mobile number');
            return;
        }
        // Check if feedback with the same numemail and text already exists
        const feedbackQuery = query(feedbackCollectionRef, where("numemail", "==", newEmail), where("text", "==", newFeedback));
        const querySnapshot = await getDocs(feedbackQuery);

        if (!querySnapshot.empty) {
            alert('Feedback already submitted');
        } else {
            await onContactUs();
            alert("Feedback successfully received");
        }
    };

    const handleChangeText = (e) => {
        setFeedback(e.target.value);
        setMessage('');
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setMessage('');
    };

    return (
        <>
            <div className='title2 title3'>
                <h2>Contact Us</h2>
            </div>

            <div className="contactUs">

                <div className="textbox" >
                    <textarea placeholder='Write Something...'
                        onChange={handleChangeText}></textarea>

                    <input type='email' placeholder='Enter Email or Phone Number'
                        onChange={handleChangeEmail} />

                    <IonButton className="ibuttons2" onClick={validateInput}>Send Message</IonButton>
                </div>

                <div className="vl"></div>

                <div className="buttons2">
                    <IonButton className="ibuttons2" href='https://wa.me/919309417021/?text=Hello' target='_main'>Whatsapp Us</IonButton>
                    <IonButton className="ibuttons2" href="mailto:foogfunction3@gmail.com" target='_main'>Email Us</IonButton>
                    <IonButton className="ibuttons2" href='tel:+91-9309417021' target='_main'>Call Us</IonButton>
                </div>

            </div>


        </>
    )
}

export default Contact