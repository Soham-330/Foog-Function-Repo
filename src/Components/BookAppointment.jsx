import { IonButton, setupIonicReact } from '@ionic/react';
import './BookAppointment.css'
setupIonicReact();
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

function BookAppointment(props) {

    const [dieticians, setDieticians] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchDieticians = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'dietician'));
                const fetchedDieticians = querySnapshot.docs.map(doc =>({ id: doc.id, ...doc.data() }));
                setDieticians(fetchedDieticians);
            } catch (error) {
                console.error("Error fetching dieticians: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDieticians();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (dieticians.length === 0) {
        return <p>No dieticians found!</p>;
    }

    return (
        <>
            <div className="appointment-body">
                <div className="container">
                    <div className="description">
                        <h2 className='heading'>Dietician Services</h2>
                        <p>Book a one-on-one consultation with a certified dietician to discuss your dietary needs and health goals. Our dieticians provide personalized advice, meal planning, and practical strategies to help you achieve better health.
                        </p>
                        <div>
                            <b>Benefits:</b>
                            <ul>
                                <li>Tailored Guidance: Customized nutrition plans based on your lifestyle and goals.</li>
                                <li>    Expert Support: Professional advice from certified dieticians.</li>
                                <li>Health Monitoring: Regular follow-ups to track and adjust your progress.</li>
                                <li>     Convenience: In-person or virtual appointments to fit your schedule.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="carousel">
                        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
                            {dieticians.map((dietician, index) => (
                                <div className='doc-carousel' key={index}>
                                    <img src={dietician.image} alt={`Dietician ${dietician.name}`} />
                                    <h3>{dietician.name}</h3>
                                    <ul>
                                        {Array.isArray(dietician.credentials) ? (
                                            dietician.credentials.map((credential, credIndex) => (
                                                <li key={credIndex}>{credential}</li>
                                            ))
                                        ) : (<li>No credentials available</li>)}
                                    </ul>
                                    <h3 className='price'>{`Price: Rs ${dietician.fees}`}</h3>
                                    <h3 className='duration'>Duration: 30 mins</h3>
                                    <Link to={`/appointment/${dietician.id}`} >
                                        <IonButton className='book-btn'> Book An Appointment</IonButton>
                                    </Link>
                                    
                                </div>
                            ))}
                        </Carousel>
                    </div>

                </div>

            </div>
        </>
    );
}

export default BookAppointment