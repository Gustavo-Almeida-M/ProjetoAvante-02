import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #57C4E5;
  color: #fff;
  height: 42px;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;
const InputDes = styled.input`
  width: 370px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;


const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome_tarefa.value = onEdit.nome_tarefa;
      user.descricao_tarefa.value = onEdit.descricao_tarefa;
      user.prazo_tarefa.value = onEdit.prazo_tarefa;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome_tarefa.value || !user.descricao_tarefa.value || !user.prazo_tarefa.value) {
      return toast.error('Preencha todos os campos');
    }

    const userData = {
      nome_tarefa: user.nome_tarefa.value,
      descricao_tarefa: user.descricao_tarefa.value,
      prazo_tarefa: user.prazo_tarefa.value,
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, userData);
        toast.success("Tarefa atualizada com sucesso");
      } else {
        await axios.post("http://localhost:8800", userData);
        toast.success("Tarefa criada com sucesso");
      }
      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error("Erro ao salvar a tarefa");
    }

    user.nome_tarefa.value = "";
    user.descricao_tarefa.value = "";
    user.prazo_tarefa.value = "";
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}> 
      <InputArea>
        <Label>Titulo</Label>
        <Input name="nome_tarefa" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <InputDes name="descricao_tarefa" />
      </InputArea>
      <InputArea>
        <Label>Prazo</Label>
        <Input name="prazo_tarefa" type="date"/>
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
