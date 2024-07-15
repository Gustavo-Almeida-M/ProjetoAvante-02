import React from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import {format} from 'date-fns';
import * as C from './StylesResults';
import { handleDelete } from './Operations';

const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

//   const handleDelete = async (id) => {
//     try {
//       console.log(id);
//       const response = await axios.delete(`http://localhost:8800/${id}`);
//       const newArray = users.filter((user) => user.id !== id);
//       setUsers(newArray);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error("Erro ao deletar a tarefa");
//     }
//   };

  
  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th>Titulo</C.Th>
          <C.Th>Descrição</C.Th>
          <C.Th>Prazo</C.Th>
          <C.Th>Ações</C.Th>
        </C.Tr>
      </C.Thead>
      <C.TBody>
        {users.map((item, i) => (
          <C.Tr key={i}>
            <C.Td width="25%">{item.nome_tarefa}</C.Td>
            <C.Td width="40%">{item.descricao_tarefa}</C.Td>
            <C.Td width="10%">{format(new Date(item.prazo_tarefa), 'dd-MM-yyyy')}</C.Td>
            <C.Td paddingTop={10} width="15%">
              <C.Td color="#57C4E5"width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </C.Td>
              <C.Td color='#3a7d44' width="5%">
                <FaCheck onClick={() => handleDelete(item.id, users, setUsers)}/>
              </C.Td>
              {/* <C.Td color='red' width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </C.Td> */}
            </C.Td>
          </C.Tr>
        ))}
      </C.TBody>

{/*       

      <TBody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="25%">{item.nome_tarefa}</Td>
            <Td width="40%">{item.descricao_tarefa}</Td>
            <Td width="10%">{format(new Date(item.prazo_tarefa), 'dd-MM-yyyy')}</Td>
            <Td paddingTop={10} width="15%">
              <Td width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td color='green' width="5%">
                <FaCheck onClick={() => handleDelete(item.id)}/>
              </Td>
              <Td color='red' width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Td>
          </Tr>
        ))}
      </TBody> */}
    </C.Table>
  );
};

export default Grid;
