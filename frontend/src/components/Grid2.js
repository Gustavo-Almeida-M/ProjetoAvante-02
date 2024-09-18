import React from 'react';
import { FaTrash, FaEdit} from 'react-icons/fa';
import * as C from '../styles/StylesResults';
import axios from 'axios';
import { toast } from 'react-toastify';

const Grid2 = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Aqui é o id: " + id);
      const response = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id_aluno !== id);
      setUsers(newArray);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Erro ao deletar a tarefa");
    }
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
          <C.Tr key={i}>
            <C.Td width="30%" alignCenter="center">{item.nome_aluno}</C.Td>
            <C.Td width="20%">{item.curso_aluno}</C.Td>
            <C.Td width="10%">{item.ira_aluno}</C.Td>
            <C.Td paddingTop={10} width="15%">
              <C.Tr color="#57C4E5"width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </C.Tr>
              <C.Tr color='red' width="5%">
                <FaTrash onClick={() => handleDelete(item.id_aluno)} />
              </C.Tr>
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

export default Grid2;
