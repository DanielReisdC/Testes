import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/logo.png";
import ImageExibicao from "../../assets/exibição.jpg";

import {
  AppBody,
  ContainerCadastro,
  SubContainerCadastro,
  Main,
  Form,
  H2Cadastro,
  Input,
  ContainerText,
  P,
  LinkLogin,
  ContainerLoginCom,
  ButtonCadastro,
  Anside,
  ContainerLogo,
  Link,
  ImageLogo,
  ContainerRecados,
  PCadastro,
  ContainerImgExib,
  Image,
} from "./styles";

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome_usuario: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
  });

  const [errors, setErrors] = useState([]);
  const [senhaError, setSenhaErrors] = useState([]);

  const handlePhone = (event) => {
    let input = event.target;
    input.value = phoneMask(input.value);
    setFormData({
      ...formData,
      [input.name]: input.value,
    });
  };

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };
  const handlePhoneChange = (e) => {
    handlePhone(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome_usuario, email, senha, confirmarSenha, telefone } = formData;
    const telefoneSemFormatacao = telefone.replace(/\D/g, "");
    if (senha !== confirmarSenha) {
      const senhaError = "As senhas não coincidem.";
      return setSenhaErrors(senhaError);
    }

    try {
      //Chamada para o backend
      const response = await axios.post(
        "http://localhost:4000/usuarios/cadastrar",
        {
          nome_usuario,
          email,
          senha,
          telefone: telefoneSemFormatacao,
        }
      );

      if (response.status === 201) {
        console.log("Usuário cadastrado com sucesso");
        navigate("/login");
      } else {
        console.error("Erro ao cadastrar o usuário");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.erros) {
        const erros = error.response.data.erros;
        setErrors(erros); // Define os erros no estado 'errors'
        // Restante do seu código de tratamento de erros...
      } else {
        console.error("Erro ao cadastrar o usuário", error);
      }
    }
  };

  return (
    <AppBody>
      <ContainerCadastro>
        <SubContainerCadastro>
          <Main>
            <Form onSubmit={handleSubmit}>
              <H2Cadastro>CADASTRO</H2Cadastro>
              <Input
                type="text"
                placeholder="NOME COMPLETO"
                required
                autoFocus
                name="nome_usuario"
                value={formData.nome_usuario}
                onChange={handleChange}
                maxLength={38}
              />
              <Input
                type="email"
                placeholder="E-MAIL"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={35}
              />
              <Input
                type="password"
                placeholder="SENHA"
                required
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                maxLength={20}
                
              />
              <Input
                type="password"
                placeholder="CONFIRME SUA SENHA"
                required
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                maxLength={25}
                
              />
              <Input
                $lastinput={true}
                type="tel"
                placeholder="TELEFONE"
                required
                name="telefone"
                value={formData.telefone}
                onChange={handlePhoneChange}
                maxLength={15}
              />
              
              {errors.length > 0 && (
                <div>
                  <p style={{ fontWeight: "bold" }}>Erros encontrados:</p>
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {errors.map((error, index) => (
                      <li key={index} style={{ color: "red" }}>
                        {error.msg}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {senhaError !== "" && (
                <p style={{ color: "red" }}>{senhaError}</p>
              )}

              <ContainerText>
                <P>JÁ POSSUI CADASTRO?</P>
                <LinkLogin onClick={() => navigate("/login")}>Login!</LinkLogin>
              </ContainerText>
              <ContainerLoginCom>
                <ButtonCadastro type="submit">CADASTRAR</ButtonCadastro>
              </ContainerLoginCom>
            </Form>
          </Main>
          <Anside>
            <ContainerLogo>
              <Link onClick={() => navigate("/landingpage")}>
                <ImageLogo src={logo} alt={"Logo-LifeTidy"} />
              </Link>
            </ContainerLogo>
            <ContainerRecados>
              <PCadastro>
                Viva de forma organizada, torne o seu dia a dia mais produtivo.
              </PCadastro>
              <PCadastro>
                A organização é a chave para a produtividade.
              </PCadastro>
            </ContainerRecados>
            <ContainerImgExib>
              <Image src={ImageExibicao} alt="Img-exibição" />
            </ContainerImgExib>
          </Anside>
        </SubContainerCadastro>
      </ContainerCadastro>
    </AppBody>
  );
};

export default App;
