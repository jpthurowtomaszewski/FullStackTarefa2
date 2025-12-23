import { sql } from "./db.js";

 async function createTable() {
   await sql`
     CREATE TABLE IF NOT EXISTS tarefas (
       id TEXT PRIMARY KEY,
       titulo TEXT NOT NULL,
       descricao TEXT,
       prioridade TEXT,
      deadline DATE
    );
   `;

   console.log("Tabela criada com sucesso");
 }

createTable().catch(console.error);

// async function dropTable() {
//   await sql`
//     DROP TABLE IF EXISTS tarefas;
//   `;
//   console.log("Tabela removida com sucesso");
// }

//dropTable().catch(console.error);
