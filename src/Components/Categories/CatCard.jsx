import { setupIonicReact, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from "@ionic/react";
import './CatCard.css';
import { Link } from "react-router-dom";
setupIonicReact();
function CatCard(props){

    return(
        <>
        <IonCard className="cat-card">
            <img alt={`Image of ${props.name}`} src={props.image} />
            <IonCardHeader>
                <IonCardTitle>{props.name}</IonCardTitle>
                {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
            </IonCardHeader>

            <IonCardContent>{props.text}</IonCardContent>
            <div className="card-btn-container">
                <Link to={`/category/${props.id}`}>
                <IonButton className="card-btn">Explore</IonButton>
                </Link>
            </div>
        </IonCard>
        
        </>
    );
}

export default CatCard