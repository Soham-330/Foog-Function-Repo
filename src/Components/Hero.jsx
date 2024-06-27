import { IonButton, setupIonicReact } from '@ionic/react'
import './Hero.css'

setupIonicReact();


function Hero() {

    return (
        <>

            <div className="background">
                <div className="title">
                    <h1>FoogFunction</h1>
                    <h3>Where taste meets Health</h3> </div>
                <div className="buttons">
                    <IonButton className='ibutton'>Book Appointment</IonButton>
                    <IonButton className='ibutton'>Order Now</IonButton>
                </div>

            </div>



        </>
    )
}
export default Hero