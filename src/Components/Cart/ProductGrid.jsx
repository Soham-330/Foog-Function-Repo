import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const ProductGrid = () => {
  const [proList, setProList] = useState([]);

  useEffect(() => {
    const getProList = async () => {
      //Reading data from database
      //Setting the List according to data
      const proCollectionRef = collection(db, "products");
      const data = await getDocs(proCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        
      }));
      setProList(filteredData);
    };

    getProList();
  }, []);

  




  return (
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
                />
              ))
            : "loading"}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
