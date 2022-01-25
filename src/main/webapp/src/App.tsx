import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/";
import theme from "./styles/theme";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Roles from "./pages/Roles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
