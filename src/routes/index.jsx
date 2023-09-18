import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Paises } from "../pages/Paises/index.jsx";
import { Data } from "../pages/Data/index.jsx";
import { Estados } from "../pages/Estados/index.jsx";
import { Registrar } from "../pages/Registrar/index.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Estados />} />
        <Route path="/paises" element={<Paises />} />
        <Route path="/data" element={<Data />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </BrowserRouter>
  );
}
