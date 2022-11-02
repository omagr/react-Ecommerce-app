import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from '../context';

function Navigation() {
    const { localCart, setLocalCart } = useContext(CartContext);
    const style_cart = {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#EE5622",
        borderRadius: 12,
        border: "none",
        color: "#FBFEF9",
        padding: "6px 12px",
    }
    return (
        <div className="relative mb-8">
            <nav className="fixed w-full top-0 left-0 container mx-auto my-auto flex item-center justify-between py-4 px-5 bg-white " 
            style={{ 
                alignItems: 'center',
                top: 0,
                right: 0,
                padding: "0 20px",
                }}>
                <div>
                    <Link to="/"> <img src="/assets/logo.png" alt="logo" style={{ height: 45, border: 'none' }} /> </Link>
                </div>
                <div>
                    <ul className="flex item-center justify-between py-4" style={{ alignItems: 'center' }}>
                        <li className="ml-3"> <Link to="/products"> Products </Link> </li>
                        <li className="ml-3">
                            <Link to="/cart">
                                <div style={style_cart}>
                                    <span className="mr-1">
                                        {localCart.totalItems ? localCart.totalItems : 0}
                                    </span>
                                    <i className="ri-shopping-cart-2-line"></i>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;