import { IonButton, setupIonicReact } from '@ionic/react';
import './BookAppointment.css'
setupIonicReact();
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

function ConsultantCarousel(props) {

    const [consultants, setconsultants] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchConsultants = async () => {
            try {
                const q = query(
                    collection(db, 'dietician'),
                    where('category','==',props.category),
                  );
                const querySnapshot = await getDocs(q);
                const fetchedconsultants = querySnapshot.docs.map(doc =>({ id: doc.id, ...doc.data() }));
                setconsultants(fetchedconsultants);
            } catch (error) {
                console.error("Error fetching consultants: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultants();
    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (consultants.length === 0) {
        return <p>No consultants found!</p>;
    }
    console.log(props);
    return (
        <>
            <div className="appointment-body">
                <div className="container">
                    <div className="description">
                        <h2 className='heading'>{props.category.toUpperCase()} SERVICES</h2>
                        {(props.category === 'physician') ? <p>Book a one-on-one consultation with a certified dietician to discuss your dietary needs and health goals. Our consultants provide personalized advice, meal planning, and practical strategies to help you achieve better health.</p> : 
                        <p>Schedule a session with a certified life coach to help you identify and achieve your personal and professional goals. Our life coaches provide personalized strategies and support to help you unlock your potential and live a more fulfilling life.</p>}
                        <div>
                            <b>Benefits:</b>
                            <ul>{(props.category === 'physician') ?
                                <>
                                <li>Tailored Guidance: Customized nutrition plans based on your lifestyle and goals.</li>
                                <li>    Expert Support: Professional advice from certified consultants.</li>
                                <li>Health Monitoring: Regular follow-ups to track and adjust your progress.</li>
                                <li>     Convenience: In-person or virtual appointments to fit your schedule.</li>
                                </> :
                                <>
                                <li>Tailored Guidance: Personalized strategies to achieve your personal and professional goals.</li>
                                <li>Expert Support: Professional advice from certified life coaches.</li>
                                <li>Goal Setting: Help in identifying and setting achievable goals.</li>
                                <li>Convenience: In-person or virtual appointments to fit your schedule.</li>
                                </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="carousel">
                        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
                            {consultants.map((dietician, index) => (
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

export default ConsultantCarousel