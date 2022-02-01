import { useEffect, useState, useRef } from "react";
//import item from "../images/item.jpg";
import Image from "next/dist/client/image";


const ProductsList = () => {
  const didMount = useRef(false);
  const [productsArray, setProductsArray] = useState(null);
  const [images, setImages] = useState({});
  const [numOfItems, setNumOfItems] = useState(0);

  const fetchData = async () => {
    const res = await fetch("https://api/products",{credentials: 'include',});
    const products = await res.json();
    setProductsArray(products);
    setNumOfItems(Object.keys(products).length);
  };

  async function fetchImages() {
    console.log(productsArray);
    productsArray.map(async function (element) {
      const response = await fetch(
        "https://api/products/images/" + element.image
      );
      const data = await response.json();
      setImages(x=>({...x, [element._id]:data}));
    });
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (didMount.current) {
      try {
        fetchImages();
        
      } catch (error) {
        console.log(error);
      }
    } else {
      didMount.current = true;
    }
  }, [productsArray]);

  return (
    <div className="bg-gray-200 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {productsArray &&
         images[Object.keys(images)[numOfItems-1]]&&
        productsArray.map(function (element, i) {
          console.log(element.name);
          return (
            <div className="card" key={element.name}>
              <Image
                loader={() => images[element._id]}
                src={images[element._id]}
                width={1920}
                height={1282}
                layout="responsive"
              />

              <div className="m-4">
                <span className="font-bold">{element.name}</span>
                <span className="block text-gray-500 text-sm">
                 $ {element.price}
                </span>
              </div>
              <div className="badge">
                <span> {element.qty} in stock</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsList;
