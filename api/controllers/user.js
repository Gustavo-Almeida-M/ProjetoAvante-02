import { db } from '../db.js';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM alunos";

    db.query(query, (err, result) => {
        if(err) return res.json(err);
        
        return res.status(200).json(result);
    });
};

export const addUser = (req, res) => {
    const q =
        "INSERT INTO alunos (nome_aluno, ira_aluno, curso_aluno) VALUES (?)";

    const values = [
        req.body.nome_aluno,
        req.body.ira_aluno,
        req.body.curso_aluno
    ];

    db.query(q, [values], (err) => {
        if (err) {
            console.error("Erro ao adicionar aluno", err);
            return res.json(err);
        }
        return res.status(200).json({ message: "aluno adicionado" });
    }
    );
};

export const updateUser = (req, res) => {
    const q = 
        "UPDATE alunos SET nome_aluno = ?, ira_aluno = ?, curso_aluno = ? WHERE id_aluno = ?";

    const values = [
        req.body.nome_aluno,
        req.body.ira_aluno,
        req.body.curso_aluno
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json({ message: "Aluno atualizado" });
    }
    );
}

export const deleteUser = (req, res) => {
    console.log("Cheguei no userDelete");
    
    const userId = req.params.id;
    const q = "DELETE FROM alunos WHERE id_aluno = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Aluno deletado com sucesso.");
    });
};