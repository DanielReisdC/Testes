import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/HeaderPrincipal/index.js";
import SideBar from "../../components/MenuLateral/index.js";
import NovaTarefaModal from "../../components/NovaTarefaModal";
import TarefaImportanciaAlta from "../../components/TarefaImportanciaAlta";
import TarefaImportanciaRegular from "../../components/TarefaImportanciaRegular";
import TarefaImportanciaBaixa from "../../components/TarefaImportanciaBaixa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

import {
  AppBody,
  Main,
  ContainerMainPrincipalHoje,
  ContainerSubEsquerda,
  ContainerSubDireita,
  ContainerSubBaixo,
  ContainerHoje,
  PPrioridadeUrgente,
  ContainerBorda,
  ContainerTarefa,
  PPrioridadeRegular,
  PPrioridadeBaixa,
  ContainerAllTarefas,
  ContainerInputData,
  InputData,
  H1Data,
} from "./styles";

const Hoje = () => {
  const navigate = useNavigate();
  const { token, setUserName, logout } = useAuth(); // Obtendo o token do contexto de autenticação

  const [isModalBootstrapOpen, setIsModalBootstrapOpen] = useState(false);
  const { sideBarIsActive } = useAuth();

  const openModalBootstrap = () => {
    setIsModalBootstrapOpen(true);
  };

  const closeModalBootstrap = () => {
    setIsModalBootstrapOpen(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && !localToken) {
      logout();
      navigate("/login");
    } else {
      const authToken = token || localToken;
      axios
        .get("https://lifetidy.onrender.com/usuarios/buscarNome", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          let userName = response.data.usuarioNome;
          let userNameSplit = userName.split(" ");
          if (userNameSplit.length > 2) {
            userName = userNameSplit.slice(0, 2).join(" ");
          }
          setUserName(userName);
          localStorage.setItem("userName", userName);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            logout();
            navigate("/login");
          } else {
            console.error("Erro ao buscar o nome do usuário:", error);
          }
        });
    }
  }, [navigate, setUserName, token, logout]);

  const { selectedDate, setSelectedDate } = useAuth();

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    const dateObject = new Date(dateValue + "T00:00:00");

    setSelectedDate(dateObject);
  };

  const formatDateToInput = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return format(date, "yyyy-MM-dd");
    } else {
      return "";
    }
  };

  return (
    <AppBody>
      <Header openModal={openModalBootstrap} />
      <ContainerMainPrincipalHoje>
        <SideBar />
        <Main $isActive={sideBarIsActive}>
          <ContainerInputData>
            <H1Data>Selecione o dia da tarefa</H1Data>
            <InputData
              type="date"
              value={formatDateToInput(selectedDate)}
              onChange={handleDateChange}
            />
          </ContainerInputData>
          <ContainerAllTarefas>
            <ContainerSubEsquerda>
              <ContainerHoje>
                <PPrioridadeUrgente>Urgente</PPrioridadeUrgente>
                <ContainerBorda></ContainerBorda>
                <ContainerTarefa>
                  <TarefaImportanciaAlta />
                </ContainerTarefa>
              </ContainerHoje>
            </ContainerSubEsquerda>
            <ContainerSubDireita>
              <ContainerHoje>
                <PPrioridadeRegular>Regular</PPrioridadeRegular>
                <ContainerBorda></ContainerBorda>
                <ContainerTarefa>
                  <TarefaImportanciaRegular />
                </ContainerTarefa>
              </ContainerHoje>
            </ContainerSubDireita>
            <ContainerSubBaixo>
              <ContainerHoje>
                <PPrioridadeBaixa>Baixa</PPrioridadeBaixa>
                <ContainerBorda></ContainerBorda>
                <ContainerTarefa>
                  <TarefaImportanciaBaixa />
                </ContainerTarefa>
              </ContainerHoje>
            </ContainerSubBaixo>
          </ContainerAllTarefas>
        </Main>
      </ContainerMainPrincipalHoje>
      {isModalBootstrapOpen && (
        <NovaTarefaModal
          isOpen={isModalBootstrapOpen}
          closeModal={closeModalBootstrap}
        />
      )}
    </AppBody>
  );
};

export default Hoje;
