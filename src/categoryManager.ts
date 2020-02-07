import Category from './entity/Category';
import {getConnection, Repository} from 'typeorm';
import {NextFunction, Request, Response} from 'express';

let initialized = false;
let categoryRepository: Repository<Category>;

const initialize = () => {
    initialized = true;
    const connection = getConnection();
    categoryRepository = connection.getRepository(Category);
};

export const readCategories = async (_: Request, res: Response, next: NextFunction) => {
    if(!initialized) {
        initialize();
    }
    try {
        const categories = await categoryRepository.find({relations: ['todos']});
        res.send(categories);
    } catch(e) {
        next(e);
    }
};
