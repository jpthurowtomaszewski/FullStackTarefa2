import { randomUUID} from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    #tarefas = new Map

    async list(search) {
        let tarefas
        if (search) {
            tarefas = await sql`select * from tarefas where titulo ilike ${'%' + search + '%'} or descricao ilike ${'%' + search + '%'}`;
        } else {
            tarefas = await sql`select * from tarefas`;
        }   
        return tarefas; 
    }

    async create(tarefa) {
        const tarefaId = randomUUID();
        const { titulo, descricao, prioridade, deadline } = tarefa;
        await sql`insert into tarefas (id, titulo, descricao, prioridade, deadline) values (${tarefaId}, ${titulo}, ${descricao}, ${prioridade}, ${deadline})`;
    }

    async update(id, novaTarefa) {
        const { titulo, descricao, prioridade, deadline } = novaTarefa;
        await sql`update tarefas set titulo = ${titulo}, descricao = ${descricao}, prioridade = ${prioridade}, deadline = ${deadline} where id = ${id}`;
    }

    async delete(id) {
        await sql`delete from tarefas where id = ${id}`;
    }   
}