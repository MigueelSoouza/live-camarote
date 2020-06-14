import React, { useState, useEffect } from "react";
import Insert from "./components/modals/Insert.js";
import Update from "./components/modals/Update.js";
import Delete from "./components/modals/Delete.js";
import { useArtista } from "../../hooks/artista.js";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Table,
  Image,
  Modal,
  Form,
} from "react-bootstrap/";

const Artistas = () => {
  const {
    artistas,
    setShow,
    setExcluirShow,
    setEditarShow,
    setArtistaAtivo,
  } = useArtista();

  return (
    <>
      <Delete />
      <Insert />
      <Update />
      <br></br>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md={10}>
            <Card body>
              <Button variant="primary" onClick={() => setShow(true)}>
                + Novo artista
              </Button>
              <hr></hr>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Apelido </th>
                    <th>Cidade </th>
                    <th>Estado </th>
                    <th>Gêneros </th>
                    <th>Foto </th>
                    <th>CPF/CNPJ</th>
                    <th>Ações </th>
                  </tr>
                </thead>

                <tbody>
                  {artistas.map((artista) => (
                    <tr key={artista.id}>
                      <td>{artista.id}</td>
                      <td>{artista.nome}</td>
                      <td>{artista.apelido}</td>
                      <td>{artista.cidade}</td>
                      <td>{artista.estado}</td>
                      <td>
                        {artista.generos.map((genero) => (
                          <p key={genero.id}>{genero.genero}</p>
                        ))}
                      </td>
                      <td>
                        <Image
                          src={"http://localhost:3333/upload/" + artista.foto}
                          rounded
                          width="100px"
                        />
                      </td>
                      <td>{artista.cpf}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setEditarShow(true);
                            setArtistaAtivo(artista.id);
                          }}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          className="m-1"
                          onClick={() => {
                            setExcluirShow(true);
                            setArtistaAtivo(artista.id);
                          }}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Artistas;
