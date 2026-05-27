import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { ProductsProvider } from "./Context/ProductsContext";
import { loadSearchIndex } from "./data/searchData";

function Bootstrap() {
  useEffect(() => {
    loadSearchIndex();
  }, []);

  return (
    <ProductsProvider>
      <App />
    </ProductsProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>
);