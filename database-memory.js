import { randomUUID} from "node:crypto";

export class DatabaseMemory {
    #tarefas = new Map

    list() {
        return Array.from(this.#tarefas.entries()).map((tarefaArray) => {
            const id = tarefaArray[0];
            const tarefa = tarefaArray[1];  
            
            return {
                id,
                ...tarefa
            }
        });
    }

    create(tarefa) {
        const tarefaId = randomUUID();
        
        this.#tarefas.set(tarefaId, tarefa);
    }

    update(id, novaTarefa) {
        this.#tarefas.set(id, novaTarefa);
    }

    delete(id) {
        this.#tarefas.delete(id);
    }   
}