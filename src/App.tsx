import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "./components/Box";

function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path="/" element={<Box title="Minha Caixa" />} /> ✅

        <Route path="/next" element={<h1>Próxima Página</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
