import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

const REGEX = /^[A-Z]/;
const MESSAGE = 'Text ($value) must start with a capital letter';

@ValidatorConstraint({name: 'capitalLetter', async: false})
export default class CapitalLetterValidator implements ValidatorConstraintInterface {
    public validate(text: string) {
        return REGEX.test(text);
    }

    public defaultMessage(args: ValidationArguments) {
        return MESSAGE;
    }
}