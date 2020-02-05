import {NextFunction, Request, Response} from 'express';
import {getConnection, Repository} from 'typeorm';
import {validate} from 'class-validator';
import Todo from './entity/Todo';
import TodoRepository from './repositories/TodoRepository';
import TodoMetadata from './entity/TodoMetadata';

let initialized = false;
let repository: TodoRepository;
let todoMetadataRepository: Repository<TodoMetadata>;

const initialize = () => {
    const connection = getConnection();
    repository = connection.getCustomRepository(TodoRepository);
    todoMetadataRepository = connection.getRepository(TodoMetadata);
    initialized = true;
};

export const createTodo = async (_: Request, res: Response, next: NextFunction) => {
    if (!initialized) {
        initialize();
    }
    try {
        const todoMetadata = new TodoMetadata();
        todoMetadata.comment = 'Hello comment';
        const todo = new Todo();
        todo.name = 'A Todo';
        const errors = await validate(todo);
        if (errors.length > 0) {
            throw 400;
        }
        todo.metadata = todoMetadata;
        await todoMetadataRepository.save(todoMetadata);
        await repository.save(todo);
        res.send(todo);
    } catch (error) {
        if (error === 400) {
            res.status(400).send('Bad Request');
        } else {
            next(error);
        }
    }
};

export const readTodos = async (_: Request, res: Response) => {
    if (!initialized) {
        initialize();
    }
    const todos = await repository.find();
    res.send(todos);
};

export const readTodosIncomplete = async (_: Request, res: Response) => {
    if (!initialized) {
        initialize();
    }
    const todos = await repository.find({isComplete: false})
    res.send(todos);
};

export const readTodosIncomplete2 = async(_: Request, res: Response, next: NextFunction) => {
    if (!initialized) {
        initialize();
    }
    try {
        const todos = await repository.findIncomplete();
        res.send(todos);
    } catch (e) {
        next(e);
    }
};