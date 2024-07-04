import './Products.css'
import React from 'react'
import { IonButton, setupIonicReact } from '@ionic/react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'


function Products() {
    // const [proList,setProList] = useState([]);
    // const proCollectionRef = collection(db,"products");
    
    // useEffect(() => {
    //     const getProList = async () => {
    //         //Reading data from database
    //         //Setting the List according to data

    //         const data = await getDocs(proCollectionRef);
    //         const filteredData = data.docs.map((doc) => ({...doc.data(),id:doc.id}));
    //         setProList(filteredData);

          
    //     };

    //     getProList();

    // },[])


    return (
        <>
            <div className='title2 title3'>
                <h2>Our Products</h2>
            </div>
            <div className="Products">
                <div className="proCard">
                    <div className="proImg"></div>
                    <div className="proText">
                        <h3>DI</h3>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam vitae nemo voluptatibus dolorum laudantium voluptate aliquid voluptas corporis impedit ex dicta quia, similique reiciendis illum?
                    </div>
                    <IonButton className='ibutton3'>Explore Now</IonButton>
                </div>
            </div>
        </>
    )
}

export default Products
