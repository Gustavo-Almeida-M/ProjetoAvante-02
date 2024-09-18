import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import * as C from '../styles/StylesResults';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../components/Header';

const AcimaMedia = ({ users, setUsers, setOnEdit, colorize }) => {


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
        if (!colorize) return 'transparent'; // Se colorize for false, nenhuma cor é aplicada
        return ira < 7 ? '#FF6347' : '#57C4E5'; // Vermelho para IRA < 7, Azul para IRA >= 7
    };



    let alunosAcimaDaMedia = users.filter((user) => user.ira_aluno >= 7)

    return (
        <>
            <Header />
            <C.Table>
                <C.Thead>
                    <C.Tr>
                        <C.Th>Nome</C.Th>
                        <C.Th>Curso</C.Th>
                        <C.Th>Ira</C.Th>
                    </C.Tr>
                </C.Thead>
                <C.TBody>
                    {alunosAcimaDaMedia.map((item, i) => (
                        <C.Tr
                            key={i}
                            style={{ backgroundColor: getBackgroundColor(item.ira_aluno) }}
                        >
                            <C.Td width="30%" alignCenter="center">{item.nome_aluno}</C.Td>
                            <C.Td width="20%">{item.curso_aluno}</C.Td>
                            <C.Td width="10%">{item.ira_aluno}</C.Td>
                            <C.Td paddingTop={10} width="15%">
                            </C.Td>
                        </C.Tr>
                    ))}
                    <C.Tr>
                        <C.Td colSpan={2} alignCenter="center" style={{ fontWeight: 'bold' }}>IRA</C.Td>
                        <C.Td style={{ fontWeight: 'bold' }}>{7}</C.Td>
                        <C.Td></C.Td>
                    </C.Tr>
                </C.TBody>
            </C.Table>
        </>
    );
};

export default AcimaMedia;
