import express from 'express';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {createTodo, readTodos, readTodosIncomplete} from './todosManager';

createConnection().then(async (connection) => {
    const app = express();
    app.get('/create', createTodo);
    app.get('/read', readTodos);
    app.get('/readIncomplete', readTodosIncomplete);
    app.listen(3000, () => console.log('Example app on port 3000'));
}).catch((error) => console.log(error));