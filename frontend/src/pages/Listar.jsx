import React, { useEffect, useState } from 'react';
import Grid from '../components/Grid'; // Certifique-se de ajustar o caminho
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import styled from 'styled-components';

const ListarAlunos = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [colorize, setColorize] = useState(false); // Estado para controlar a coloração

  const Button = styled.button`
      border: 1px solid #ccc;
      border-radius: 7px;
      margin-top: 20px;
      margin-left: 70px;
      width: 200px;
      height: 40px;
    `;

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800'); // Ajuste a URL da API se necessário
      setUsers(response.data.sort((a, b) => (a.nome_aluno > b.nome_aluno ? 1 : -1)));
    } catch (error) {
      toast.error('Erro ao buscar alunos');
    }
  };

  const trocarCores = () => {
    setColorize(!colorize); // Alterna o estado de coloração
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header />
      <h1>Lista de Alunos</h1>
      <Button  onClick={trocarCores}>
        {colorize ? 'Remover Cores' : 'Aplicar Cores'}
      </Button>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} colorize={colorize} />
    </>
  );
};

export default ListarAlunos;
