import { db } from '../db.js';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM tarefas";

    db.query(query, (err, result) => {
        if(err) return res.json(err);
        
        return res.status(200).json(result);
    });
};

export const addUser = (req, res) => {
    const q =
        "INSERT INTO tarefas (nome_tarefa, descricao_tarefa, prazo_tarefa) VALUES (?)";

    const values = [
        req.body.nome_tarefa,
        req.body.descricao_tarefa,
        req.body.prazo_tarefa,
    ];

    db.query(q, [values], (err) => {
        if (err) {
            console.error("Erro ao adicionar tarefa", err);
            return res.json(err);
        }
        return res.status(200).json({ message: "Tarefa criada" });
    }
    );
};

export const updateUser = (req, res) => {
    const q = 
        "UPDATE tarefas SET nome_tarefa = ?, descricao_tarefa = ?, prazo_tarefa = ? WHERE id = ?";

    const values = [
        req.body.nome_tarefa,
        req.body.descricao_tarefa,
        req.body.prazo_tarefa,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json({ message: "Tarefa atualizada" });
    }
    );
}

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const q = "DELETE FROM tarefas WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Tarefa deletada com sucesso.");
    });
};