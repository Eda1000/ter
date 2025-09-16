import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "components/Box";

const Home = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Página Home</h1>
      <p>Bem-vindo ao sistema 🚀</p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Container para os toasts */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
