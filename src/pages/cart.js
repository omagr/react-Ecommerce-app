import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context";
import ThankYou from "../components/thankyouComponent";

function Cart() {
  const { localCart, setLocalCart } = useContext(CartContext);
  const [cartArray, setCartArray] = useState([]);
  const [fetchedproducts, setfetchedproducts] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  let grandTotal = 0;

  useEffect(() => {
    if (!localCart.items) {
      return;
    } else {
      if (fetchedproducts) {
        return;
      } else {
        let arrayFromCartObj = Object.keys(localCart.items);
        // we will be doing to make an intersection array of localcart array and the array of all 100 elemnts that is coming from server
        axios
          .get(`https://foodbukka.herokuapp.com/api/v1/menu`)
          .then((res) => {
            setCartArray([
              ...res.data.Result.filter((item) =>
                arrayFromCartObj.includes(item._id)
              ),
            ]);
          })
          .catch((err) => console.log(err));
        setfetchedproducts(true);
      }
    }
  }, [localCart]);

  // functions
  const getQuntity = (id) => {
    return localCart.items[id];
  };

  const increament = (id) => {
    const existingQunty = getQuntity(id);
    const _cart = { ...localCart };
    _cart.items[id] = existingQunty + 1;
    _cart.totalItems += 1;
    setLocalCart({ ..._cart });
  };

  const decreament = (id) => {
    const existingQunty = getQuntity(id);
    if (existingQunty === 1) {
      return;
    }
    const _cart = { ...localCart };
    _cart.items[id] = existingQunty - 1;
    _cart.totalItems -= 1;
    setLocalCart({ ..._cart });
  };

  const getPrice = (id) => {
    const sum = getQuntity(id) * Math.floor(Math.random() * 1000);
    grandTotal += sum;
    return sum;
  };

  const deleteProduct = (id) => {
    const _cart = { ...localCart };
    const qunty = _cart.items[id];
    delete _cart.items[id];
    _cart.totalItems -= qunty;
    setLocalCart({ ..._cart });
    setCartArray(cartArray.filter((product) => product._id != id));
  };

  const orderedNow = () => {
    setLocalCart({});
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
      setCartArray([]);

    }, 3000);

  };
  return cartArray.length ?
    <div>
      {!showThankYou ?
        <div className="container mx-auto pb-24 lg:w-1/2 w-full  px-4 " style={{marginTop:'100px', position:'realtive'}}>
          <h1 className="my-12 font-bold text-2xl sm:text-3xl text-center">Cart Items</h1>
          <ul>
            {
              cartArray.map((product) => {
                return (
                  <li key={product._id} className='mb-12'>
                    <div className="flex items-center w-full justify-between flex-col py-4 border-y-2 sm:flex-row">
                      <div className="flex items-center mb-4 sm:mb-0 w-full flex items-center justify-between">
                        <img
                          className="h-20 w-40 rounded-lg"
                          src={product.images[Math.floor(Math.random() * (2 + 1))]}
                          alt="cart_img"
                        />
                        <span className="font-bold ml-4 w-48">
                          {product.menuname}
                        </span>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div>
                          <button className="bg-yellow-500 px-2 py-1 rounded-full font-bold active:bg-yellow-600"
                            onClick={() => increament(product._id)}>
                            +
                          </button>
                          <span className="font-bold mx-2">
                            {
                              getQuntity(product._id)
                            }
                          </span>
                          <button className="bg-yellow-500 px-2 py-1 rounded-2xl font-bold active:bg-yellow-600"
                            onClick={() => decreament(product._id)}>
                            -
                          </button>
                        </div>
                        <span className="font-bold">
                          ₹ {
                            getPrice(product._id)
                          }
                        </span>
                        <button
                          className="bg-red-500 text-neutral-50 px-3 py-2 rounded-2xl font-bold active:bg-red-600"
                          onClick={() => {
                            deleteProduct(product._id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <hr className="my-5" />
          <div className="flex items-center justify-between taxt-center">
            <div className="font-bold">Grand Total:</div>
            <div className="font-bold text-2xl"> ₹ {grandTotal} </div>
          </div>
          <div
            className="w-full bg-yellow-500 py-2 px-4 rounded-full font-bold active:bg-yellow-600 w-full mt-5 text-center cursor-pointer"
            onClick={() => {
              orderedNow();
            }}
          >
            order now!
          </div>
        </div>
        :
        <ThankYou />
      }
    </div>
    :
    <div style={{marginTop:'100px', position:'realtive'}}>
      <h1 className="text-2xl sm:text-4xl font-bold text-center">Empty Cart!</h1>
      <h3 className="text-1xl m:text-2xl text-center">order now something..</h3>
      <img
        className="mx-auto w-1/2 mt-12"
        src="/assets/empty-cart.png"
        alt="empty-cart.png"
      />
    </div>

}

export default Cart;
