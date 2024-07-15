import React from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import * as C from './StylesResults';
import { handleDelete } from './Operations';

const Concluidos = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    // Filtra as tarefas concluídas
    const completedTasks = users.filter(item => item.tarefa_concluida == 1);

    return (
        <>
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
                    {completedTasks.map((item, i) => (
                        <C.Tr key={i}>
                            <C.Td width="25%">{item.nome_tarefa}</C.Td>
                            <C.Td width="40%">{item.descricao_tarefa}</C.Td>
                            <C.Td width="10%">{format(new Date(item.prazo_tarefa), 'dd-MM-yyyy')}</C.Td>
                            <C.Td paddingTop={10} width="15%">
                                <C.Td color="#57C4E5" width="5%">
                                    <FaEdit onClick={() => handleEdit(item)} />
                                </C.Td>
                                <C.Td color='#3a7d44' width="5%">
                                    <FaCheck onClick={() => handleDelete(item.id)} />
                                </C.Td>
                                {/* <C.Td color='red' width="5%">
                                    <FaTrash onClick={() => handleDelete(item.id)} />
                                </C.Td> */}
                            </C.Td>
                        </C.Tr>
                    ))}
                </C.TBody>
            </C.Table>
        </>
    );
}

export default Concluidos;
