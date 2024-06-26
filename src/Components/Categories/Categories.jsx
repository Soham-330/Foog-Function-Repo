import { setupIonicReact, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonTitle } from "@ionic/react"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Config/FirebaseConfig";
import CatCard from "./CatCard";
import './Categories.css'


setupIonicReact();
function Categories(){
    //cat is alias for categories
    const [catList,setCatList] = useState([]);
    const catCollectionRef = collection(db,"categories");

    useEffect(() => {
        const getCatList = async () => {
            //Reading data from database
            //Setting the List according to data

            try{
                const data = await getDocs(catCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(),id:doc.id}));
                setCatList(filteredData);
            } catch(err) {
                console.error(err);
            }
        };

        getCatList();

    },[])

    return(
        <>
        <IonTitle>Categories</IonTitle>
        <div className="cat-body">
            {catList.map((cat) => (
                <div>
                    <CatCard name={cat.name} image={cat.image} text={cat.text} />
                </div>
            ))}
        </div>
        </>
    );
}

export default Categories