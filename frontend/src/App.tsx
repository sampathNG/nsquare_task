// import React from "react";
// import { ProductProvider } from "./context/ProductContext";
// import { ProductList } from "./components/ProductLists";
// function App() {
//   return (
//     <ProductProvider>
//       <div className="min-h-screen bg-gray-100">
//         <ProductList />
//       </div>
//     </ProductProvider>
//   );
// }
// export default App;
//
// import React from "react";
// import { ProductList } from "./components/ProductList";
// import { ProductForm } from "./components/ProductForm";

// const App = () => {
//   return (
//     <div className="container mx-auto py-8">
//       <ProductForm />
//       <ProductList />
//     </div>
//   );
// };

// export default App;
//
import React from "react";
import { ProductList } from "./components/ProductList";

const App = () => {
  return (
    <div className="container mx-auto py-8">
      <ProductList />
    </div>
  );
};

export default App;
