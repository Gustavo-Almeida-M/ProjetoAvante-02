import { db } from '../db.js';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM tarefas";

    db.query(query, (err, result) => {
        if(err) return res.json(err);
        
        return res.status(200).json(result);
    });
};
