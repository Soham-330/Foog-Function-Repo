import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
// import './Categories.css'
import CatCard from "./Categories/CatCard";

function Products(){
    const id = useParams();
    console.log(id);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(
                collection(db,'products'),
                where('categoryId','==',id.id),
            );
            const productsSnapshot = await getDocs(q);
            const productList = productsSnapshot.docs.map(doc => doc.data());
            setProducts(productList);
        }
        fetchProducts();
    },[]);


    return(
        <>
        <div className="cat-body">
            {products.map((cat) => (
                <div>
                    <CatCard name={cat.name} image={cat.image} text={cat.text} id={cat.id} key={id}/>
                </div>
            ))}
        </div>
        </>
    );

}

export default Products