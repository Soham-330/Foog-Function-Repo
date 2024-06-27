import { IonButton, setupIonicReact } from '@ionic/react';
import './BookAppointment.css'
setupIonicReact();
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function BookAppointment(props) {

    return (
        <>
        <Carousel>
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
                    <div className="counselor-det">
                        <div className="image"></div>
                        <div className="creden">
                            <ul>
                                <li>Creden 1</li>
                                <li>Creden 2</li>
                                <li>Creden 3</li>
                                <li>Creden 4</li>
                            </ul>
                        </div>
                        <p className='appointment-det'>Price: Rs300</p>
                        <p className='appointment-det'>Duration: 15 Minutes</p>

                        <IonButton className='book-btn'> Book An Appointment</IonButton>

                    </div>
                </div>

            </div><div className="appointment-body">
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
                    <div className="counselor-det">
                        <div className="image"></div>
                        <div className="creden">
                            <ul>
                                <li>Creden 1</li>
                                <li>Creden 2</li>
                                <li>Creden 3</li>
                                <li>Creden 4</li>
                            </ul>
                        </div>
                        <p className='appointment-det'>Price: Rs300</p>
                        <p className='appointment-det'>Duration: 15 Minutes</p>

                        <IonButton className='book-btn'> Book An Appointment</IonButton>

                    </div>
                </div>

            </div>

        </Carousel>
            

        </>
    );
}

export default BookAppointment