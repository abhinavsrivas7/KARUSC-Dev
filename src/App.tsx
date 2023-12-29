import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { Admin } from "./pages/Admin";

const App = () => <>
  <Navbar />
  <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  </Container>
</>;

export default App;