import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./contexts/ShopContext.jsx";
import WishlistContextProvider from "./contexts/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ShopContextProvider>
  <WishlistContextProvider
    backendUrl={import.meta.env.VITE_BACKEND_URL}
    token={localStorage.getItem("token")}
  >
    <App />
  </WishlistContextProvider>
</ShopContextProvider>


  </BrowserRouter>
);
