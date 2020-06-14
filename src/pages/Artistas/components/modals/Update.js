import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Image, Modal, Form, Row, Col } from "react-bootstrap/";
import { useArtista } from "../../../../hooks/artista.js";
import api from "../../../../services/api.js";
import InputMask from "react-input-mask";

const Update = () => {
  const {
    ArtistaAtivo,
    artistas,
    setArtistas,
    showEditar,
    setEditarShow,
  } = useArtista();

  const [padrao, setPadrao] = useState({
    rock: false,
    pop: false,
    sertanejo: false,
    funk: false,
    classico: false,
  });

  const [formulario, setFormulario] = useState({
    cpf: "",
    nome: "",
    apelido: "",
    cidade: "",
    estado: "",
    generos: [],
    foto: "",
  });

  useEffect(() => {
    if (!ArtistaAtivo) {
      return;
    } else {
      api.get("artistas/" + ArtistaAtivo).then((Response) => {
        setFormulario({
          ...Response.data.artista,
          generos: Response.data.generos.map((genero) => genero.genero),
        });

        setAvatar({
          preview: Response.data.artista.foto,
          file: null,
        });

        console.log(Response.data.artista.foto);
        const newpadrao = {};

        for (var i = 0, l = Response.data.generos.length; i < l; i++) {
          switch (Response.data.generos[i].genero) {
            case "Rock":
              newpadrao.rock = true;
              break;
            case "Pop":
              newpadrao.pop = true;
              break;
            case "Sertanejo":
              newpadrao.sertanejo = true;
              break;
            case "Funk":
              newpadrao.funk = true;
              break;
            case "Clássico":
              newpadrao.classico = true;
              break;

            default:
              break;
          }
        }

        setPadrao(newpadrao);
      });
    }
  }, [ArtistaAtivo]);

  useEffect(() => {
    if (formulario.cpf.length == 18) {
      setEstadoPessoa("CNPJ");
    } else if (formulario.cpf.length == 14) {
      setEstadoPessoa("CPF");
    }
  }, [formulario.cpf]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validarcpf(formulario.cpf);
    } catch (erro) {
      alert(erro);
      return;
    }

    let fototoupload;

    const oldPhoto = avatar.preview;

    if (avatar.file) {
      const formData = new FormData();
      formData.append("foto", avatar.file);
      const responsefoto = await api.post("upload", formData);
      fototoupload = responsefoto.data;
    } else {
      fototoupload = oldPhoto;
    }

    const response = await api.put("artistas/" + ArtistaAtivo, {
      ...formulario,
      foto: fototoupload,
    });
    const {
      id,
      cpf,
      nome,
      apelido,
      cidade,
      estado,
      foto,
    } = response.data.artista;
    const generos = response.data.generos;

    setArtistas(
      artistas.map((artista) => {
        if (artista.id == ArtistaAtivo) {
          return {
            id,
            cpf,
            nome,
            apelido,
            cidade,
            estado,
            foto,
            generos,
          };
        } else {
          return artista;
        }
      })
    );

    setEditarShow(false);
  };

  const optionref = useRef(null);
  const handleOptionChange = async (e) => {
    let select = optionref.current;
    let values = [].filter
      .call(select.options, (o) => o.selected)
      .map((o) => o.value);
    setFormulario({
      ...formulario,
      generos: values,
    });
  };

  const cnpj = useRef(null);
  const cpf = useRef(null);
  const [estadoPessoa, setEstadoPessoa] = useState("CPF");

  const validarcpf = (cpf) => {
    const cpfnovo = cpf
      .replace(/[^\w\s]/gi, "")
      .replace(/_/g, "")
      .replace(/ /g, "");

    if (cpfnovo.length != 11 && estadoPessoa == "CPF") {
      throw "O CPF é requerido.";
    }

    if (cpfnovo.length != 14 && estadoPessoa == "CNPJ") {
      throw "O CNPJ é requerido.";
    }
  };

  const capturePessoa = (e) => {
    setFormulario({ ...formulario, cpf: "" });
    const pessoa = e.target.value;

    if (pessoa == "fisica") {
      cnpj.current.name = "nada";
      cpf.current.name = "cpf";
      setEstadoPessoa("CPF");
    } else if (pessoa == "juridica") {
      cnpj.current.name = "cpf";
      cpf.current.name = "nada";
      setEstadoPessoa("CNPJ");
    }
  };

  const avatarRef = useRef();
  const [avatar, setAvatar] = useState({
    preview: "",
    file: null,
  });

  const onImgLoad = ({ target: img }) => {
    const maxW = 200;
    const maxH = 250;
    if (img.width > maxW && img.height < maxH) {
      // só largura errada.
      alert(
        "A largura máxima permitida é " +
          maxW +
          "px. Sua imagem possui uma largura de " +
          img.width +
          "px"
      );
      avatarRef.current.value = "";
      avatarRef.current.required = true;
      setAvatar({
        preview: "",
        file: null,
      });
      return;
    } else if (img.width < maxW && img.height > maxH) {
      // só altura errada
      alert(
        "A altura máxima permitida é " +
          maxH +
          "px. Sua imagem possui uma largura de " +
          img.height +
          "px"
      );
      avatarRef.current.value = "";
      avatarRef.current.required = true;
      setAvatar({
        preview: "",
        file: null,
      });
      return;
    } else if (img.width > maxW && img.height > maxH) {
      // tudo errado
      alert(
        "A largura máxima permitida é " +
          maxW +
          "px e a altura máxima permitida é " +
          maxH +
          "px . Sua imagem possui o tamanho de " +
          img.width +
          "px por " +
          img.height +
          "px"
      );
      avatarRef.current.value = "";
      avatarRef.current.required = true;
      setAvatar({
        preview: "",
        file: null,
      });
      return;
    } else {
    }
  };

  const handleAvatarChange = (e) => {
    if (!e.target.files[0]) return;

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      alert(
        "O sistema não permite que você envie imagens fora das extensões permitidas. *JPEG, JPG, PNG*."
      );
      avatarRef.current.value = "";
      avatarRef.current.required = true;
      setAvatar({
        preview: "",
        file: null,
      });
      return;
    }

    setAvatar({
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  return (
    <>
      <Modal show={showEditar} onHide={() => setEditarShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar informações</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="EX: Miguel Henrique"
                value={formulario.nome}
                name="nome"
                onChange={handleChange}
                required={true}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Apelido</Form.Label>
              <Form.Control
                type="text"
                placeholder="EX: MC Miguelzinho"
                value={formulario.apelido}
                name="apelido"
                onChange={handleChange}
                required={true}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="EX: Paraná"
                value={formulario.estado}
                name="estado"
                onChange={handleChange}
                required={true}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="EX: Londrina"
                value={formulario.cidade}
                name="cidade"
                onChange={handleChange}
                required={true}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Gêneros</Form.Label>
              <Form.Control
                as="select"
                multiple
                ref={optionref}
                onChange={handleOptionChange}
                required={true}
                autoFocus={true}
              >
                <option selected={padrao.rock}>Rock</option>
                <option selected={padrao.pop}>Pop</option>
                <option selected={padrao.sertanejo}>Sertanejo</option>
                <option selected={padrao.funk}>Funk</option>
                <option selected={padrao.classico}>Clássico</option>
              </Form.Control>
            </Form.Group>

            <fieldset>
              <Form.Group>
                <Form.Label as="legend">Tipo de pessoa</Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Check
                      type="radio"
                      label="Pessoa Física"
                      name="radio"
                      id="radio1"
                      value="fisica"
                      checked={estadoPessoa == "CPF" ? true : false}
                      onChange={capturePessoa}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Check
                      type="radio"
                      label="Pessoa Jurídica"
                      name="radio"
                      id="radio2"
                      value="juridica"
                      checked={estadoPessoa == "CNPJ" ? true : false}
                      onChange={capturePessoa}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </fieldset>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>{estadoPessoa}</Form.Label>

              <InputMask
                mask="999.999.999-99"
                value={formulario.cpf}
                disabled={estadoPessoa == "CPF" ? false : true}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <Form.Control
                    type={estadoPessoa == "CPF" ? "text" : "hidden"}
                    placeholder="Cpf do artista"
                    value={formulario.cpf}
                    name="cpf"
                    required={true}
                    id="cpf"
                    ref={cpf}
                    disabled={estadoPessoa == "CPF" ? false : true}
                    {...inputProps}
                  />
                )}
              </InputMask>

              <InputMask
                mask="99.999.999/9999-99"
                value={formulario.cpf}
                disabled={estadoPessoa == "CNPJ" ? false : true}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <Form.Control
                    type={estadoPessoa == "CNPJ" ? "text" : "hidden"}
                    placeholder="Cnpj do artista"
                    value={formulario.cpf}
                    name="cpf"
                    required={true}
                    id="cnpj"
                    ref={cnpj}
                    disabled={estadoPessoa == "CNPJ" ? false : true}
                    {...inputProps}
                  />
                )}
              </InputMask>
            </Form.Group>

            <hr></hr>

            {avatar.preview && avatar.file ? (
              <img
                alt="Person"
                style={{ display: "none" }}
                src={avatar.preview}
                onLoad={onImgLoad}
              />
            ) : (
              <img
                alt="Person"
                style={{ display: "none" }}
                src={avatar.preview}
                onLoad={onImgLoad}
              />
            )}

            {avatar.preview && avatar.file ? (
              <Image alt="Person" width="100%" src={avatar.preview} />
            ) : (
              <Image
                width="100%"
                src={"http://localhost:3333/upload/" + avatar.preview}
              />
            )}

            <label htmlFor="avatar" style={{ cursor: "pointer" }}>
              <p>Selecionar uma foto (max 200x250 JPEG, JPG ou PNG)</p>

              <Form.Control
                accept="image/*"
                id="avatar"
                onChange={handleAvatarChange}
                ref={avatarRef}
                type="file"
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditarShow(false)}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Update;
