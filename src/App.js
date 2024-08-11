import "./assets/css/App.css";
import { CartProvider } from "./context/CartContext";
import EcommerceProductCatalog from "./pages/entry";

function App() {
  return (
    <CartProvider>
      <EcommerceProductCatalog />
    </CartProvider>
  );
}

export default App;
