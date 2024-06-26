import { setupIonicReact, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from "@ionic/react";
import './CatCard.css';
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
            <IonButton className="card-btn">Explore</IonButton>
        </IonCard>
        
        </>
    );
}

export default CatCard