
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './contexts/CartContext';
import NavbarComponent from './components/NavbarComponent';
import GetProductsComponent from './components/GetProductsComponent';
import AddProductComponent from './components/AddProductComponent';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import MakePaymentComponent from './components/MakePaymentComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<GetProductsComponent />} />
            <Route path="/addproduct" element={<AddProductComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/signin" element={<SignInComponent />} />
            <Route path="/cart" element={<SmartCart />} />
            <Route path="/makepayment" element={<MakePaymentComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
