import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./Routes.js";
import { ArtistaProvider } from "./hooks/artista.js";

const App = () => {
  return (
    <>
      <ArtistaProvider>
        <Routes />
      </ArtistaProvider>
    </>
  );
};

export default App;
