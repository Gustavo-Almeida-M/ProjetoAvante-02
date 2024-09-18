import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../components/forms';
import Grid2 from '../components/Grid2';
import axios from 'axios';
import Header from '../components/Header';

const Container = styled.div`
  margin: 0 auto;
  width: 60%;
  padding-bottom: 20px;
  min-height: 50vh;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #064789;
  border-radius: 7px;
  box-shadow: 0 0 5px #ccc;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #fff;
`;

function Editar() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800');
      setUsers(response.data.sort((a, b) => (a.nome_tarefa > b.nome_tarefa ? 1 : -1)));
    } catch (error) {
      toast.error('Erro ao buscar dados');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
      <>
      <Header />
      <Container>
        <Title>Editar alunos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid2 users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default Editar;