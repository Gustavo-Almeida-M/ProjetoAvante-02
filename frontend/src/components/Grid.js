import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Table = styled.table`
  width: 100%;
  border-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
  width: ${(props) => (props.width ? props.width : 'auto')};
`;
export const TBody = styled.tbody``;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Erro ao deletar a tarefa");
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Tarefa</Th>
          <Th>Descrição</Th>
          <Th>Estado</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <TBody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="25%">{item.nome_tarefa}</Td>
            <Td width="40%">{item.descricao_tarefa}</Td>
            <Td width="10%">{item.estado_tarefa}</Td>
            <Td alignCenter width="10%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default Grid;
