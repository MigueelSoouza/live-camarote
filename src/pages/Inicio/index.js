import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap/";

const Inicio = () => {
  return (
    <>
      <br></br>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md={10}>
            <Card body>
              <p>Bem-vindo(a) ao Gerenciador de artistas.</p>{" "}
              <p>Para começar, clique em Gerenciar Artistas.</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inicio;
