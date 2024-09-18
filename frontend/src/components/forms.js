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
const InputLongo = styled.input`
  width: 250px;
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
      user.nome_aluno.value = onEdit.nome_aluno;
      user.ira_aluno.value = onEdit.ira_aluno;
      user.curso_aluno.value = onEdit.curso_aluno;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.nome_aluno.value || !user.ira_aluno.value || !user.curso_aluno.value) {
      return toast.error('Preencha todos os campos');
    }

    const userData = {
      nome_aluno: user.nome_aluno.value,
      ira_aluno: user.ira_aluno.value,
      curso_aluno: user.curso_aluno.value
    };

    try {
      if (onEdit) {
        console.log("Aqui é o onEdit: " + onEdit.id_aluno);

        await axios.put(`http://localhost:8800/${onEdit.id_aluno}`, userData);
        toast.success("Aluno atualizada com sucesso");
      } else {
        await axios.post("http://localhost:8800", userData);
        toast.success("Aluno criado com sucesso");
      }
      setOnEdit(null);
      getUsers();
    } catch (error) {
      console.log(error);

    }

    user.nome_aluno.value = "";
    user.ira_aluno.value = "";
    user.curso_aluno.value = "";
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <InputLongo name="nome_aluno" />
      </InputArea>
      <InputArea>
        <Label>Curso</Label>
        <InputLongo name="curso_aluno" />
      </InputArea>
      <InputArea>
        <Label>Ira</Label>
        <Input name="ira_aluno" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
