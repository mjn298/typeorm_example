import {Length, Validate} from 'class-validator';
import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import CapitalLetterValidator from '../validators/CapitalLetterValidator';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Length(0, 10)
    @Validate(CapitalLetterValidator)
    public name: string = '';

    @Index()
    @Column()
    public isComplete: boolean = false;
}

export default Todo;