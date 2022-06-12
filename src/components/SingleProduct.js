import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context';

const SingleProduct = (props) => {
    // so the props is the object of all the data that have been in declaring file 
    // this is simple js function so we can write logic here 

    // distructuring of object 

    // const { product_object } = props.productName;
    // somehow it is not working 

    // console.log(useContext(CartContext))
    // let { cartObj, setCart } = useContext(CartContext); // <<<<<<<<<------------------- glti 


    // note -------> agr object ko distrcuture krna h eport krke toh ukso orginal key hi deni pdegi khuch bhi hojay  
    const { localCart, setLocalCart } = useContext(CartContext);
    const [is_adding, setis_adding] = useState(false)
    // --------------------------------------------------
    // ok sooooooo sara bakchodi yha horha tha useContext jo parent me value dete ho uise string me bdl dete hei h so JSON.parse() ks use keke object bnana ppdta hei 
    // --------------------------------------------------

    const addToCart = (event, currentProduct) => {
        /*
        agr hm 
        onClick={addToCart()} toh yeh khud render hojata without clicking,
        onClick={addToCart} yeh perfect he per fir hum onClick ke propertise nhi deskte,
        onClick={(e) => {addToCart(e,product)}} perefct ab hm sb krskte hei.
        */
        // event.stopPropagation(); =====> agr parent me onclick or child me onclick ho tb use hota he yeh
        // event.preventDefault() =====> for almost everthing except first wala thing
        event.preventDefault();
        // cloning the real object because we dont want it to changed to new 
        let _cart = localCart;
        // agr _cart ke andr item key nhi he toh
        /*
        // how will cart look 
        cart = 
            {
                items: {
                    product_id:quantity,
                    id1:1,
                    id2:3,
                    ......
                } ,
                totalItems : 0
            {
        */
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

        // setting the card in glbal useState in app.js
        // useContext(CartContext).setCart(_cart)

        setLocalCart({ ..._cart })

        setis_adding(true)
        setTimeout(() => {
            setis_adding(false)
        }, 500);
        // setCart(...cart_object_from_app, _cart)

        /*
                /\
                | 
                |
                |
                |
                |          
         just because of this bug i wasted 6 days to get the result alomost every single stackoverflow query, article, video and everything i had used,
         so here is the explaination =====> so mene .provider me value ek array di thi jisme ek useSate ki cart array or setSatate ka funtion tha ,mene object nhi tha kyuki error arrha tha destructuring me then i used setCart(  [..._cart]  )
         jisse yeh ek default array me gya na ki nested array me
        
        */
    }

    return (
        // /products/ agr iski jgha products/ lra toh wo ya tage url koi se bhi url ke piche as is it lgg jayga 
        <Link to={`/products/${props.productName._id}`}>

            <div className="cursor-pointer border-2 border-current py-4 px-4 rounded-lg">
                <img
                    src={props.productName.images[Math.floor(Math.random() * (2 + 1))]} alt="peproni.png" className="rounded-lg" />
                <h2 className="text-lg font-bold py-2 text-center">
                    {props.productName.menuname}
                </h2>
                <div className="conatiner flex items-center justify-between mt-4">
                    <span>
                        ₹ {Math.floor(Math.random() * 1000)}
                    </span>
                    <button
                        disabled={is_adding}
                        className={`${is_adding ? 'bg-green-500' : 'bg-yellow-500'} 
                    py-1 px-4 rounded-full font-bold active:bg-yellow-600`}
                        onClick={(e) => { addToCart(e, props.productName) }}>
                        {`${!is_adding ? "ADD" : "ADDED"}`}
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default SingleProduct;