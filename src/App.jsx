import "./App.css";
import DessertListing from "./components/DessertListing";
import { CartContextProvider } from "./context/useCart";

function App() {
  return (
    <>
      <CartContextProvider>
        <div className="container">
          <DessertListing />
        </div>
      </CartContextProvider>
    </>
  );
}

export default App;
