import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { About } from "./pages/About";
import { Navbar } from "./components/Common/Navbar";
import { Footer } from "./components/Common/Footer";
import { Banner } from "./components/Home/Banner";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";
import { Admin } from "./pages/Admin";
import { ProductDetails } from "./pages/ProductDetails";
import { LoggedInUserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { Checkout } from "./pages/Checkout";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ShippingAndDelivery } from "./pages/ShippingAndDelivery";
import { ReturnAndExchange } from "./pages/ReturnAndExchange";

const App = () => {

    return <LoggedInUserProvider>
        <CartProvider>
            <ScreenSizeProvider>
                <Banner title="Free shipping within India, on orders above INR 2000."></Banner>
                <Navbar />
                <div className="light-pink" style={{ paddingRight: '0px', paddingLeft: '0px', }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ProductList" element={<ProductList />} />
                        <Route path="/ProductDetails" element={<ProductDetails />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Admin" element={<Admin />} />
                        <Route path="/Checkout" element={<Checkout />} />
                        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                        <Route path="/ShippingAndDelivery" element={<ShippingAndDelivery />} />
                        <Route path="/ReturnAndExchange" element={<ReturnAndExchange />} />
                        <Route path="/About" element={<About />} />
                    </Routes>
                </div>
                <Footer></Footer>
            </ScreenSizeProvider>
        </CartProvider>
    </LoggedInUserProvider>
};

export default App;