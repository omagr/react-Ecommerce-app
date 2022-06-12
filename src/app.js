import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import Home from "./pages/home";
import Navigation from "./components/navigation";
import Cart from "./pages/cart";
import ProductsPage from "./pages/productsPage";
import ProductDes from "./pages/productDes";
import { CartContext } from "./context";
import { SearchContext } from "./context";
import { getCart, storeCart } from "./helpers";
import Error from "./pages/error";
import SearchBar from "./components/searchBar";

// *data sharing between parent and child ==> props
// *data sharing between child and parent ==> function ---> ek function bnate hei jo child me prop ki trah dete h, or wha child elemnet me us funtion ko call krte uske under data jo parent ko pass krna hei uss function ko as paramnetr pass krte hei, or us function ko parent declare krke uss parameter se data mil jata hei
// state management
// *data sharing between child and parent and sibling and grandelements ==> context api ---> isse data hm centralised jgha pe rkh skte hei jisse jo bhi use krna ho kr ske

function App() {

  const [localCart, setLocalCart] = useState({});
  const [query, setQuery] = useState('');

  // get cart from local storage when the conponent mounted

  useEffect(() => {
    getCart().then((localCartFromLoaclStorage) => setLocalCart(JSON.parse(localCartFromLoaclStorage)));
    // whenever page got resfresh the state of cart become null bcoz the useState only stayed untill the page got re-render. so,
  }, []);

  // set the cart in localstorage once the cart changed

  // iske do barr chlne ka reason upper wala getCart he jisse wo phile bar me render horke empty {} deta he fir then kuch samy baad jb wo local stroage se aa jata toh dubara render hojata h 
  useEffect(() => {
    storeCart(JSON.stringify(localCart));
  }, [localCart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ localCart, setLocalCart }}>
          <SearchContext.Provider value={{ query, setQuery }}>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/products" element={<ProductsPage />}></Route>
              {/* /: ------> for dynamic routing  */}
              <Route path="/products/:_kuchbhi" element={<ProductDes />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Routes>
            <SearchBar />
          </SearchContext.Provider>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
