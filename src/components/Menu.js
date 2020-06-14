import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import logo from "../logo.png";

function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <Image src={logo} width="250px"></Image>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/artistas">Gerenciar Artistas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
