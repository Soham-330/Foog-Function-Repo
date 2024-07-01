import { IonButton, setupIonicReact } from '@ionic/react'
import './Hero.css'

import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
setupIonicReact();


function Contact() {

    const [feedbackList, setFeedbackList] = useState([]);
    const feedbackCollectionRef = collection(db, "feedback")

    useEffect(() => {
        const getMovieList = async () => {

            const data = await getDocs(feedbackCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setFeedbackList(filteredData);
        }

    }, [])


    const [newFeedback, setFeedback] = useState("");

    const [newEmail, setEmail] = useState("");





    const onContactUs = async () => {
        await addDoc(feedbackCollectionRef, {
            numemail: newEmail,
            text: newFeedback,
        });
    }

    const [message, setMessage] = useState('');

    const validateInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!(emailRegex.test(newEmail) || phoneRegex.test(newEmail))) {
            setMessage('Please enter a valid Email or Mobile number');
            alert('Please enter a valid Email or Mobile number');
        }
        else {
            onContactUs();
            alert("Feedback Sucessesfully received");
        }
    }

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





                <div className="vl"> </div>
                <div className="buttons2">
                    <IonButton className="ibuttons2">Whatsapp Us</IonButton>
                    <IonButton className="ibuttons2">Email us</IonButton>
                    <IonButton className="ibuttons2">Call Us </IonButton>
                    
                </div>


            </div>


        </>
    )
}
export default Contact