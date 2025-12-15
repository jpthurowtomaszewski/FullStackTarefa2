// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('opa')
//     return response.end()
// });

// server.listen(3000)

import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';


const server = fastify();
const database = new DatabaseMemory();

// CRUD - Create, Read, Update, Delete
// GET http://localhost:3000/tarefas
// POST http://localhost:3000/tarefas
// PUT http://localhost:3000/tarefas/:id
// DELETE http://localhost:3000/tarefas/:id

// Routes parameters

server.get('/', () => {
    return 'Opa';
});

server.get('/tarefas', () => {
    const tarefas = database.list();
    console.log(tarefas);
    return tarefas;
});

server.post('/tarefas', (request, reply) => {

//request.body

    const { titulo, descricao, deadline, prioridade } = request.body

    database.create({
        titulo,
        descricao,
        deadline,
        prioridade
    });

    console.log([database.list()]);

    return reply.status(201).send('tarefa criada com sucesso');
});

server.put('/tarefas/:id', (request, reply) => {
    const tarefaId = request.params.id;
    const { titulo, descricao, deadline, prioridade } = request.body;

    const tarefa = database.update(tarefaId, {
        titulo,
        descricao,
        deadline,
        prioridade
    });

    return reply.status(200).send('tarefa atualizada com sucesso');
});

server.delete('/tarefas/:id', (request, reply) => {
    const tarefaId = request.params.id;
    database.delete(tarefaId);
    reply.status(200).send('tarefa deletada com sucesso');
});

server.listen({ port: 3000 });