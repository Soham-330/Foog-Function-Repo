import { setupIonicReact, IonButton } from "@ionic/react";
import './CatCard.css';
import { Link } from "react-router-dom";
setupIonicReact();
function CatCard(props) {

    return (
        <>

            <div className="catCard">
                <div className="catImg">
                    <img alt={`Image of ${props.name}`} src={props.image} />
                </div>
                <h3>{props.name}</h3>
                <div className="catText">
                    {props.text}
                </div>
                <Link to={`/products/${props.id}`}>
                <IonButton className='cat-ibutton'>Explore</IonButton>
                </Link>
            </div>
        </>
    );
}

export default CatCard

