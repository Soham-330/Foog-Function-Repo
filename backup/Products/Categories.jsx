import { setupIonicReact, IonButton } from "@ionic/react"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import CatCard from "./CatCard";
import './Categories.css'
import './CatCard.css';


setupIonicReact();
function Categories() {
    //cat is alias for categories
    const [catList, setCatList] = useState([]);
    const catCollectionRef = collection(db, "categories");

    useEffect(() => {
        const getCatList = async () => {
            //Reading data from database
            //Setting the List according to data

            const data = await getDocs(catCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setCatList(filteredData);
        };

        getCatList();

    }, [])

    return (
        <>

            <div className='title2 title3'>
                <h2>Categories</h2>
            </div>
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