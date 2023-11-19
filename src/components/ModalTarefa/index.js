import React, { useState } from "react";
import axios from "axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  ContainerAdicionarTarefa,
  ContainerH2Tarefa,
  StyledIcon,
  H2AdicionarTarefa,
  InputSelect,
  TextArea,
  ContainerButtonExit,
  FormDetalhesTarefas,
  ContainerCategoria,
  H4InfomacoesInputs,
  SelectInputsWidth,
  ContainerImportancia,
  ContainerInicio,
  ContainerInicioConclusaoHorario,
  ContainerConclusao,
  ContainerDescricaoTarefa,
  DivButtonNovaTarefa,
  ButtonCriarTarefa,
} from "./styles";

const Modal = ({ isOpen, closeModal }) => {

  const [formState, setFormState] = useState({
    nome_tarefa: "",
    descricao: "",
    categoria: "",
    data_inicio: "",
    data_fim: "",
    hora_inicio: "",
    hora_fim: "",
    importancia: "",
    status: ""
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/tarefas/adicionar",
        formState,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <ContainerAdicionarTarefa>
        <ContainerH2Tarefa>
          <H2AdicionarTarefa>ADICIONAR TAREFA</H2AdicionarTarefa>
          <ContainerButtonExit>
            <StyledIcon icon={faClose} onClick={closeModal} />
          </ContainerButtonExit>
        </ContainerH2Tarefa>
        <FormDetalhesTarefas onSubmit={handleSubmit}>
          <ContainerCategoria>
            <H4InfomacoesInputs>CATEGORIA</H4InfomacoesInputs>
            <SelectInputsWidth
              name="categoria"
              id="categoria"
              value={formState.categoria}
              onChange={handleChange}
            >
              <option value="estudo">ESTUDO</option>
              <option value="compras">COMPRAS</option>
              <option value="agenda">AGENDA</option>
            </SelectInputsWidth>
          </ContainerCategoria>
          <ContainerImportancia>
            <H4InfomacoesInputs>IMPORTÂNCIA</H4InfomacoesInputs>
            <SelectInputsWidth
              name="importancia"
              id="importancia"
              value={formState.importancia}
              onChange={handleChange}
            >
              <option value="urgente">URGENTE</option>
              <option value="regular">REGULAR</option>
              <option value="pouco-urgente">BAIXA</option>
            </SelectInputsWidth>
          </ContainerImportancia>
          <ContainerInicio>
            <ContainerInicioConclusaoHorario>
              <H4InfomacoesInputs>INÍCIO</H4InfomacoesInputs>
              <InputSelect
                type="date"
                name="data_inicio"
                id="data_inicio"
                value={formState.data_inicio}
                onChange={handleChange}
              />
            </ContainerInicioConclusaoHorario>
            <ContainerInicioConclusaoHorario>
              <H4InfomacoesInputs>HORÁRIO</H4InfomacoesInputs>
              <InputSelect
                type="time"
                name="hora_inicio"
                value={formState.hora_inicio}
                onChange={handleChange}
              />
            </ContainerInicioConclusaoHorario>
          </ContainerInicio>
          <ContainerConclusao>
            <ContainerInicioConclusaoHorario>
              <H4InfomacoesInputs>CONCLUSÃO</H4InfomacoesInputs>
              <InputSelect
                type="date"
                name="data_fim"
                value={formState.data_fim}
                onChange={handleChange}
              />
            </ContainerInicioConclusaoHorario>
            <ContainerInicioConclusaoHorario>
              <H4InfomacoesInputs>HORÁRIO</H4InfomacoesInputs>
              <InputSelect
                type="time"
                name="hora_fim"
                value={formState.hora_fim}
                onChange={handleChange}
              />
            </ContainerInicioConclusaoHorario>
          </ContainerConclusao>
          <ContainerDescricaoTarefa>
            <H4InfomacoesInputs>TAREFA</H4InfomacoesInputs>
            <TextArea
              type="text"
              id="tarefa"
              name="nome_tarefa"
              value={formState.nome_tarefa}
              onChange={handleChange}
            ></TextArea>
          </ContainerDescricaoTarefa>
          
          <ContainerDescricaoTarefa>
            <H4InfomacoesInputs>DESCRIÇÃO</H4InfomacoesInputs>
            <TextArea
              type="text"
              name="descricao"
              value={formState.descricao}
              onChange={handleChange}
            ></TextArea>
          </ContainerDescricaoTarefa>
          <DivButtonNovaTarefa>
          <ButtonCriarTarefa type="submit">CRIAR TAREFA</ButtonCriarTarefa>
          </DivButtonNovaTarefa>
        </FormDetalhesTarefas>
      </ContainerAdicionarTarefa>
    </Dialog>
  );
};

export default Modal;
