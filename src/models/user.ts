import { tasks } from "./tasks";

export interface user {
    id: number,
    nome: string,
    email: string,
    senha: string,
    tipo: string,
    tasks: tasks[]
}