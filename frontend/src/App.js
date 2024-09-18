import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'; // Importar Routes e Route
import axios from 'axios';
import Home from './pages/home';
import Listar from './pages/Listar';
import Criar from './pages/Criar';
import Editar from './pages/Editar';
import Cursos from './pages/Cursos';
import AcimaMedia from './pages/AcimaMedia';
import AbaixoMedia from './pages/AbaixoMedio';

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

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800');
      setUsers(response.data.sort((a, b) => (a.nome_aluno > b.nome_aluno ? 1 : -1)));
    } catch (error) {
      toast.error('Erro ao buscar dados');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/listar" element={ <Listar /> }/>
        <Route path="/criar" element={ <Criar /> }/>
        <Route path="/editar" element={ <Editar /> }/>
        <Route path="/cursos" element={ <Cursos /> }/>
        <Route path="/acimamedia" element={ <AcimaMedia users={users} setUsers={setUsers} setOnEdit={setOnEdit} colorize={true} /> }/>
        <Route path="/abaixomedia" element={ <AbaixoMedia users={users} setUsers={setUsers} setOnEdit={setOnEdit} colorize={true} /> }/>
      </Routes>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default App;
