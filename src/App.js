import "./assets/css/App.css";
import { CartProvider } from "./components/CartContext";
import EcommerceProductCatalog from "./pages/entry";

function App() {
  return (
    <CartProvider>
      <EcommerceProductCatalog />
    </CartProvider>
  );
}

export default App;
