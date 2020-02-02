import {NextFunction, Request, Response} from 'express';
import {getConnection, Repository} from 'typeorm';
import {validate} from 'class-validator';
import Todo from './entity/Todo';

let repository: Repository<Todo>;

const initialize = () => {
    const connection = getConnection();
    repository = connection.getRepository(Todo);
};

export const createTodo = async (_: Request, res: Response, next: NextFunction) => {
    if (repository === undefined) {
        initialize();
    }
    try {
        const todo = new Todo();
        todo.name = 'A Todo';
        const errors = await validate(todo);
        if (errors.length > 0) {
            throw 400;
        }
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
    if (repository === undefined) {
        initialize();
    }
    const todos = await repository.find();
    res.send(todos);
};

export const readTodosIncomplete = async (_: Request, res: Response) => {
    if (repository === undefined) {
        initialize();
    }
    const todos = await repository.find({isComplete: false})
    res.send(todos);
};
