import {Length, Validate} from 'class-validator';
import {AfterInsert, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import CapitalLetterValidator from '../validators/CapitalLetterValidator';
import TodoMetadata from './TodoMetadata';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    public id: number;

    @Validate(CapitalLetterValidator)
    public name: string = '';

    @Column('character varying', {
        name: 'name',
        nullable: false
    })
    public persistedName: string = '';

    @Index()
    @Column()
    public isComplete: boolean = false;

    @OneToOne(() => TodoMetadata)
    @JoinColumn()
    public metadata: TodoMetadata;

    @AfterInsert()
    public handleAfterInsert() {
        console.log(`INSERTED TODO WITH ID: ${this.id}`);
    }
}

export default Todo;