// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('opa')
//     return response.end()
// });

// server.listen(3000)

import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';


const server = fastify();
//const database = new DatabaseMemory();
const database = new DatabasePostgres();

// CRUD - Create, Read, Update, Delete
// GET http://localhost:3000/tarefas
// POST http://localhost:3000/tarefas
// PUT http://localhost:3000/tarefas/:id
// DELETE http://localhost:3000/tarefas/:id

// Routes parameters

server.get('/', () => {
    return 'Opa';
});

server.get('/tarefas', async (request) => {
    const search = request.query.search;
    
    const tarefas = await database.list(search);
    
    return tarefas;
});

server.post('/tarefas', async (request, reply) => {

//request.body

    const { titulo, descricao, deadline, prioridade } = request.body

    await database.create({
        titulo,
        descricao,
        deadline,
        prioridade
    });

    console.log([database.list()]);

    return reply.status(201).send('tarefa criada com sucesso');
});

server.put('/tarefas/:id', async (request, reply) => {
    const tarefaId = request.params.id;
    const { titulo, descricao, deadline, prioridade } = request.body;

    const tarefa = await database.update(tarefaId, {
        titulo,
        descricao,
        deadline,
        prioridade
    });

    return reply.status(200).send('tarefa atualizada com sucesso');
});

server.delete('/tarefas/:id', async (request, reply) => {
    const tarefaId = request.params.id;
    await database.delete(tarefaId);
    reply.status(200).send('tarefa deletada com sucesso');
});

server.listen({ 
    port: process.env.PORT ??3333 
}, () => {
    console.log('Server is running on port 3333');
});