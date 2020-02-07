import {getConnection, Repository} from 'typeorm';
import Author from './entity/Author';
import {NextFunction, Request, Response} from 'express';

let initialized = false;
let authorRepository: Repository<Author>;

const initialize = () => {
    const connection = getConnection();
    authorRepository = connection.getRepository(Author);
    initialized = true;
};

export const readAuthors = async (_: Request, res: Response, next: NextFunction) => {
    if(!initialized) {
        initialize();
    }
    try {
        const authors = await authorRepository.find({relations: ['todos']});
        res.send(authors);
    } catch (error) {
        next(error);
    }
};

