import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';




export var products;


const ProductGrid = () => {
    const [proList, setProList] = useState([]);

    useEffect(() => {
        const getProList = async () => {
            //Reading data from database
            //Setting the List according to data
            const proCollectionRef = collection(db, "products");
            const data = await getDocs(proCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProList(filteredData);
            // console.log(filteredData);
        };

        getProList();



    }, [])

    console.log(proList)



    // products = proList.slice(0)







    return (
        <>
            <div className='title2 title3'>
                <h2>Products</h2>
            </div>
            <div>
                <div className='Products'>

                    {proList.length>0 ? proList.map((product, key) =>
                        <ProductCard key={key} data={product} />
                    ) : "loading"}
                </div>
            </div>
        </>

    )

}



export default ProductGrid




