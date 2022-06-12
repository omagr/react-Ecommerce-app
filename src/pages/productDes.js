import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { CartContext } from "../context";


const ProductDes = () => {
  const [product, setProduct] = useState({});
  const [is_adding, setis_adding] = useState(false)
  const { localCart, setLocalCart } = useContext(CartContext);
  // so the params give the value of dynammic url
  // it will give the value of _kuchbhi as object  
  const params = useParams();
  // so the useNavigate is hook that give several method realate to url like goback and more 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://foodbukka.herokuapp.com/api/v1/menu/${params._kuchbhi}`)
      .then(res => { setProduct(res.data.Result) })
      .catch(err => console.log(err))
  }, [params._kuchbhi]);

  function addToCart(currentProduct) {
    const _cart = localCart;
    if (!_cart.items) {
      _cart.items = {}
    }
    if (_cart.items[currentProduct._id]) {
      _cart.items[currentProduct._id] += 1;
    } else {
      _cart.items[currentProduct._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setLocalCart({ ..._cart })
    setis_adding(true)
    setTimeout(() => {
      setis_adding(false)
    }, 500);
  }

  return (
    <div className="container mx-auto mt-20 px-5">
      <button className="mb-12 font-bold py-2 px-5 bg-stone-800 rounded-xl text-white flex items-center justify-center" onClick={() => navigate(-1)}>
        <i className="ri-arrow-left-line"></i>
        back
      </button>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center">
        <div>
          <img
            src='../assets/peproni.png'
            alt=""
            className="w-full" />
          <button
            disabled={is_adding}
            onClick={() => { addToCart(product) }}
            className={`${!is_adding ? "bg-yellow-500" : "bg-green-500"} py-2 px-4 rounded-full font-bold active:bg-yellow-600 w-full my-5`} >
            {`${is_adding ? "ADDED" : "ADD"}`}
          </button>
        </div>
        <div className="sm:ml-16 sm:mb-0 w-full mb-10" >
          <h1 className="text-xl font-bold mb-2 text-center">{product.menuname}</h1>
          <h2 className="font-bold mt-2 mb-2 text-center">₹ {Math.floor(Math.random() * 1000)}</h2>
          <p className="font-light text-xl mb-2 text-center">{product.description}</p>
          <h3 className="font-bold text-center">rating : {product.__v}</h3>
        </div>
      </div>
    </div>
  )
}

export default ProductDes;