import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import ProductCard from "./ProductCard";


function Products(){

    
    const id = useParams();

    const [proList, setProList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(
                collection(db,'products'),
                where('categoryId','==',id.id),
            );
            const productsSnapshot = await getDocs(q);
            const newProList = productsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProList(newProList);
        }
        fetchProducts();
    },[]);

    return(
        <>
        <div className="title2 title3">
        <h2>Products</h2>
      </div>
      <div>
        <div className="Products">
          {proList.length > 0
            ? proList.map((product) => (
                <ProductCard
                key={product.id}
                id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  minimumQuantity={product.minimumQuantity}
                  availableQuantity={product.availableQuantity}
                  text={product.text}
                />
              ))
            : <div className="loadingPage">
            <h2>No Products Found</h2>
         </div>}
        </div>
      </div>
        </>
    );

}

export default Products

