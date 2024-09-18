import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Header from '../components/Header';

const Cursos = () => {
    const [users, setUsers] = useState([]);
    const [groupedByCourse, setGroupedByCourse] = useState({});
    const [colorize, setColorize] = useState(false);

    const calcularMediaIra = () => {
        if (users.length === 0) return 0; // Evita divisão por zero se não houver alunos
        const totalIra = users.reduce((sum, user) => sum + user.ira_aluno, 0);
        return (totalIra / users.length).toFixed(2); // Retorna a média com 2 casas decimais
    };

    const Button = styled.button`
        border: 1px solid #ccc;
        border-radius: 7px;
        margin-top: 20px;
        margin-left: 70px;
        width: 200px;
        height: 40px;
        background-color: ${props => props.colorize ? '#e0e0e0' : '#f9f9f9'};
    `;

    const Table = styled.table`
        width: 300px;
        height: 100px;
        background-color: #fff;
        border-collapse: collapse;
    `;

    const TableCell = styled.td`
        padding: 8px;
        text-align: left;
        background-color: ${props => props.colorize && props.ira < calcularMediaIra() ? '#ffcccc' : 'transparent'};
    `;

    const Div = styled.div`
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-left: 20px;
    `;

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8800');
            const alunos = response.data;

            const groupByCurso = alunos.reduce((acc, aluno) => {
                const { curso_aluno } = aluno;
                if (!acc[curso_aluno]) {
                    acc[curso_aluno] = [];
                }
                acc[curso_aluno].push(aluno);
                return acc;
            }, {});

            setGroupedByCourse(groupByCurso);
            setUsers(alunos);
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
            <h1>Lista de Alunos por Curso</h1>
            <Button colorize={colorize} onClick={trocarCores}>
                {colorize ? 'Remover Cores' : 'Aplicar Cores'}
            </Button>
            {Object.keys(groupedByCourse).map((curso, index) => (
                <div key={index}>
                    <h2>{curso}</h2>
                    <Div>
                        <Table border="1">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>IRA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedByCourse[curso].map((aluno, i) => (
                                    <tr key={i}>
                                        <td>{aluno.nome_aluno}</td>
                                        <TableCell colorize={colorize} ira={aluno.ira_aluno}>
                                            {aluno.ira_aluno}
                                        </TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Div>
                </div>
            ))}
        </>
    );
};

export default Cursos;
