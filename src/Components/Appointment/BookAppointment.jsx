import { IonButton, setupIonicReact } from '@ionic/react';
import './BookAppointment.css'
setupIonicReact();

function BookAppointment(props) {

    return(
        <><div className="appointment-body">
            <div className="container">
                <div className="description">
                    <h2 className='heading'>Heading</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam recusandae corporis laudantium. Itaque minima eos laborum aperiam velit quod omnis rem sit praesentium dolorem repellat, totam modi nihil, maxime inventore!
                    Nobis, corporis nemo. Dolor laboriosam reiciendis perspiciatis unde asperiores officiis, velit quibusdam accusamus dolorem, expedita incidunt exercitationem reprehenderit blanditiis neque. Fugiat, at veniam? Aut, iusto ipsam commodi voluptate autem maxime! 
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, quibusdam amet provident tenetur enim corrupti suscipit nobis quam, fuga, saepe vel ipsum eum quo. Obcaecati quibusdam a nostrum officiis tenetur.
                    Repellat officia consequuntur laboriosam id eum quidem doloribus, ea tempore! Sit tempore minus velit, quas labore in praesentium aut explicabo delectus, necessitatibus, placeat quo id error et vel? Quis, ut!
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
                    <p className='appointment-det'>Price: {props.price}</p>
                    <p className='appointment-det'>Duration: {props.dur}</p>
                </div>
            </div>
            <div className="book">
            <IonButton className='book-btn'> Book An Appointment</IonButton>
            </div>
        </div>
        
        </>
    );
}

export default BookAppointment