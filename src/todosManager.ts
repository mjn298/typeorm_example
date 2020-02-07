import {NextFunction, Request, Response} from 'express';
import {getConnection, Repository} from 'typeorm';
import {validate} from 'class-validator';
import Todo from './entity/Todo';
import TodoRepository from './repositories/TodoRepository';
import TodoMetadata from './entity/TodoMetadata';
import Author from './entity/Author';
import Category from './entity/Category';

let initialized = false;
let repository: TodoRepository;
let todoMetadataRepository: Repository<TodoMetadata>;
let authorRepository: Repository<Author>;
let categoryRepository: Repository<Category>;

const initialize = () => {
    const connection = getConnection();
    repository = connection.getCustomRepository(TodoRepository);
    todoMetadataRepository = connection.getRepository(TodoMetadata);
    authorRepository = connection.getRepository(Author);
    categoryRepository = connection.getRepository(Category);
    initialized = true;
};

export const createTodo = async (_: Request, res: Response, next: NextFunction) => {
    if (!initialized) {
        initialize();
    }
    try {
        let category1: Category;
        let category2: Category;
        const categories = await categoryRepository.find();
        if (categories.length === 0) {
            category1 = new Category();
            category1.name = 'One';
            category2 = new Category();
            category2.name = 'Two';
            await categoryRepository.save(category1);
            await categoryRepository.save(category2);
        } else {
            category1 = categories[0];
            category2 = categories[1];
        }
        let author: Author;
        const authors = await authorRepository.find();
        if(authors.length === 0) {
            author = new Author();
            author.name = 'John Doe';
            await authorRepository.save(author);
        } else {
            author = authors[0];
        }
        const todoMetadata = new TodoMetadata();
        todoMetadata.comment = 'Hello comment';
        const todo = new Todo();
        todo.name = 'A Todo';
        const errors = await validate(todo);
        if (errors.length > 0) {
            throw 400;
        }
        todo.metadata = todoMetadata;
        todo.author = author;
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
