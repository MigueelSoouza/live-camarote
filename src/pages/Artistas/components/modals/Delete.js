import React from "react";
import { Button, Image, Modal, Form } from "react-bootstrap/";
import { useArtista } from "../../../../hooks/artista.js";
import api from "../../../../services/api.js";

const Delete = () => {
  const {
    ArtistaAtivo,
    artistas,
    setArtistas,
    showExcluir,
    setExcluirShow,
  } = useArtista();

  const excluir = async () => {
    await api.delete("artistas/" + ArtistaAtivo);
    setArtistas(artistas.filter((artista) => artista.id != ArtistaAtivo));
    setExcluirShow(false);
  };

  return (
    <>
      <Modal show={showExcluir} onHide={() => setExcluirShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir artista {ArtistaAtivo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você realmente deseja excluir o artista?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExcluirShow(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => excluir()}>
            Sim, excluir!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Delete;
