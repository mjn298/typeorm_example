import Todo from '../entity/Todo';
import {AbstractRepository, EntityRepository, FindConditions} from 'typeorm';

const OFFSET = 7;
const PREFIX = 'prefix_';

@EntityRepository(Todo)
export default class TodoRepository extends AbstractRepository<Todo> {
    public save(todo: Todo): Promise<Todo> {
        todo.persistedName = `${PREFIX}${todo.name}`;
        return this.manager.save(todo);
    }

    public find(conditions?: FindConditions<Todo>): Promise<Todo[]> {
        return this.repository.find({
            cache: true,
            relations: ['author', 'metadata', 'categories'],
            where: conditions
        }).then((todos) => {
            return todos.map((todo) => {
                todo.name = todo.persistedName.slice(OFFSET);
                return todo;
            });
        });
    }

    public findIncomplete(): Promise<Todo[]> {
        return this.repository.createQueryBuilder('todo')
            .innerJoinAndSelect('todo.metadata', 'metadata')
            .innerJoinAndSelect('todo.author', 'author')
            .leftJoinAndSelect('todo.categories', 'category')
            .where('todo."isComplete" = :value', {value: false})
            .cache(true)
            .getMany()
            .then((todos) => {
                return todos.map((todo) => {
                    todo.name = todo.persistedName.slice(OFFSET);
                    return todo;
                })
            })
    }
}
