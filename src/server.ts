import express from 'express';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {createTodo, readTodos, readTodosIncomplete, readTodosIncomplete2} from './todosManager';
import {readAuthors} from './authorsManager';
import {readCategories} from './categoryManager';

createConnection().then(async (connection) => {
    const app = express();
    app.get('/create', createTodo);
    app.get('/read', readTodos);
    app.get('/readIncomplete', readTodosIncomplete);
    app.get('/readIncomplete2', readTodosIncomplete2);
    app.get('/readAuthors', readAuthors);
    app.get('/readCategories', readCategories);
    app.listen(3000, () => console.log('Example app on port 3000'));
}).catch((error) => console.log(error));
