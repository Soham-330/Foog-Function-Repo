import { IonButton, setupIonicReact } from '@ionic/react';
import './BookAppointment.css'
setupIonicReact();
import React, { Component, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

function BookAppointment(props) {

    const [dieticians, setDieticians] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDieticians = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'dietician'));
                const fetchedDieticians = querySnapshot.docs.map(doc => doc.data());
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
                        <h2 className='heading'>Heading</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam recusandae corporis laudantium. Itaque minima eos laborum aperiam velit quod omnis rem sit praesentium dolorem repellat, totam modi nihil, maxime inventore!
                            Nobis, corporis nemo.
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, quibusdam amet provident tenetur enim corrupti suscipit nobis quam, fuga, saepe vel ipsum eum quo. Obcaecati quibusdam a nostrum officiis tenetur.
                            Repellat officia consequuntur laboriosam id eum quidem doloribus,
                        </p>
                    </div>
                    <div className="carousel">
                        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
                            {dieticians.map((dietician, index) => (
                                <div className='doc-carousel' key={index}>
                                    <img src={dietician.image} alt={`Dietician ${dietician.name}`} />
                                    <h2>{dietician.name}</h2>
                                    <ul>
                                        {Array.isArray(dietician.credentials) ? (
                                            dietician.credentials.map((credential, credIndex) => (
                                                <li key={credIndex}>{credential}</li>
                                            ))
                                        ) : (<li>No credentials available</li>)}
                                    </ul>
                                    <h3 className='price'>{`Price: Rs ${dietician.fees}`}</h3>
                                    <h3 className='duration'>Duration: 30 mins</h3>
                                    <IonButton className='book-btn'> Book An Appointment</IonButton>
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