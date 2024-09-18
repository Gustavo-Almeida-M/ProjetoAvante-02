import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import * as C from '../styles/StylesResults';
import axios from 'axios';
import { toast } from 'react-toastify';

const Grid = ({ users, setUsers, setOnEdit, colorize }) => {

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id_aluno !== id);
      setUsers(newArray);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Erro ao deletar o aluno");
    }
  };

  const getBackgroundColor = (ira) => {
    if (!colorize) return 'transparent';
    return ira < calcularMediaIra() ? '#FF6347' : '#57C4E5';
  };

  const calcularMediaIra = () => {
    if (users.length === 0) return 0;
    const totalIra = users.reduce((sum, user) => sum + user.ira_aluno, 0);
    return (totalIra / users.length).toFixed(2);
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th>Nome</C.Th>
          <C.Th>Curso</C.Th>
          <C.Th>Ira</C.Th>
        </C.Tr>
      </C.Thead>
      <C.TBody>
        {users.map((item, i) => (
          <C.Tr
            key={i}
            style={{ backgroundColor: getBackgroundColor(item.ira_aluno) }} // Aplica a cor de fundo na linha toda
          >
            <C.Td width="30%" alignCenter="center">{item.nome_aluno}</C.Td>
            <C.Td width="20%">{item.curso_aluno}</C.Td>
            <C.Td width="10%">{item.ira_aluno}</C.Td>
            <C.Td paddingTop={10} width="15%">
              <C.Tr color='red' width="5%">
                <FaTrash onClick={() => handleDelete(item.id_aluno)} />
              </C.Tr>
            </C.Td>
          </C.Tr>
        ))}
        <C.Tr>
          <C.Td colSpan={2} alignCenter="center" style={{ fontWeight: 'bold' }}>Média do IRA</C.Td>
          <C.Td style={{ fontWeight: 'bold' }}>{calcularMediaIra()}</C.Td>
          <C.Td></C.Td>
        </C.Tr>
      </C.TBody>
    </C.Table>
  );
};

export default Grid;
