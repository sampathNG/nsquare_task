import React from "react";
import { ProductProvider } from "./context/ProductContext";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-100">
        <ProductList />
      </div>
    </ProductProvider>
  );
}

export default App;
