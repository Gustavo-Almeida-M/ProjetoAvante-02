import { toast } from 'react-toastify';
import axios from 'axios';

export const Concluido = async (id, users, setUsers) => {
  try {
    const response = await axios.put(`http://localhost:8800/${id}`);
    const newArray = users.filter((user) => user.id !== id);
    setUsers(newArray);
    toast.success(response.data.message);
  } catch (error) {
    toast.error("Erro ao concluir a tarefa");
  }
};
export const handleDelete = async (id, users, setUsers) => {
  try {
    const response = await axios.delete(`http://localhost:8800/${id}`);
    const newArray = users.filter((user) => user.id !== id);
    setUsers(newArray);
    toast.success(response.data.message);
  } catch (error) {
    toast.error("Erro ao deletar a tarefa");
  }
};