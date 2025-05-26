import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import data from './product.json'
import CartPage from "./Components/Cart/Cart";
import ProductPage from "./Components/ProductPage/ProductPage";
import { CartProvider } from "./Context/CartContext";
import Logger from "./Logger";
import { QuestionsProvider } from "./Context/QuestionContext";
import Endpage from "./Components/EndPage/Endpage";
const logger = new Logger(); // Create a logger instance

function LogPageView() {
  const location = useLocation();
  const previousPathRef = React.useRef(null); // Track the previous path

  useEffect(() => {
      const currentPath = location.pathname;

      // Log "stop" for the previous page if it's different from the current path
      if (previousPathRef.current && previousPathRef.current !== currentPath) {
          logger.log(previousPathRef.current, "stop");
      }

      // Log "start" for the current page only if it's a new navigation
      if (previousPathRef.current !== currentPath) {
          logger.log(currentPath, "start");
      }

      // Update the previous path
      previousPathRef.current = currentPath;
  }, [location]);

  return null;
}
function App() {
  return (
    <CartProvider>
         <QuestionsProvider>
      <Router>
      <LogPageView />
        <Navigation />
          <div className="App" style={{width:'100%', flex:1}}>
            <Routes>
            <Route path="/end" element={<Endpage logger={logger} />} />
          <Route path="/" element={<Home data={data.lady} title={"Ladies' Section"}   />} />
          <Route path="/men" element={<Home data={data.men} title={"Men's Section"} />} />
            <Route path="/cart" element={<CartPage logger={logger} />} />
            <Route path="/product/:gender/:sale/:id" element={<ProductPage data={data} logger={ logger} />} />
          </Routes>
          </div>
        </Router>
        </QuestionsProvider>
      </CartProvider>
  );
}

export default App;