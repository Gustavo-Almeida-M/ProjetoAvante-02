import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/forms';
import Grid from './components/Grid';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
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
      <Container>
        <Title>Tarefas</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default App;
