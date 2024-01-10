import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Navbar } from "./components/Common/Navbar";
import { Footer } from "./components/Common/Footer";
import { Banner } from "./components/Common/Banner";

const App = () => <>
    <Banner></Banner>
    <Navbar />
    <Container className="mb-4">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </Container>
    <Footer></Footer>
</>;

export default App;