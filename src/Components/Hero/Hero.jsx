import { IonButton, setupIonicReact } from '@ionic/react'
import './Hero.css'
import { Link } from 'react-router-dom';

setupIonicReact();


function Hero() {

    return (
        <>

            <div className="background">
                <div className="title">
                    <h1>FoogFunction</h1>
                    <h3>Where taste meets Health</h3> </div>
                <div className="buttons">


                    <Link className="link" to="/BookAppointment">
                        <IonButton className='ibutton'>Book Appointment</IonButton>
                    </Link>
                    <Link className="link" to="/Categories">
                        <IonButton className='ibutton'>Order Now</IonButton>
                    </Link>


                </div>

            </div>



        </>
    )
}
export default Hero