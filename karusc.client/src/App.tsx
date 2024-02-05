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

const App = () => {
    return <ScreenSizeProvider>
        <Banner title="Free shipping within India, on orders above INR 1000."></Banner>
        <Navbar />
        <div className="light-pink" style={{ paddingRight: '0px', paddingLeft: '0px', }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ProductList" element={<ProductList />} />
                <Route path="/ProductDetails" element={<ProductDetails />} />
                <Route path="/About" element={<About />} />
                <Route path="/Admin" element={<Admin />} />
            </Routes>
        </div>
        <Footer></Footer>
    </ScreenSizeProvider>
};

export default App;