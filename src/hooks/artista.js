import React, { useState, useEffect, createContext, useContext } from "react";
import api from "../services/api.js";

const ArtistaContext = createContext({});
export const ArtistaProvider = ({ children }) => {
  //Mostrar artistas
  const [artistas, setArtistas] = useState([]);
  useEffect(() => {
    api.get("artistas").then((Response) => {
      setArtistas(Response.data);
    });
  }, []);

  //estado para modais;
  const [show, setShow] = useState(false);
  const [showEditar, setEditarShow] = useState(false);
  const [showExcluir, setExcluirShow] = useState(false);
  const [ArtistaAtivo, setArtistaAtivo] = useState(null);

  return (
    <ArtistaContext.Provider
      value={{
        artistas,
        setArtistas,
        show,
        setShow,
        showEditar,
        setEditarShow,
        showExcluir,
        setExcluirShow,
        ArtistaAtivo,
        setArtistaAtivo,
      }}
    >
      {children}
    </ArtistaContext.Provider>
  );
};
export function useArtista() {
  const context = useContext(ArtistaContext);
  if (!context) {
    throw new Error("useArtista must be used within an ArtistaProvider");
  } else {
    return context;
  }
}
