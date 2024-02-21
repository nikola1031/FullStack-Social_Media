import { capitalize } from "./capitalize";

type ValidationPatternObject = {
    pattern: RegExp,
    message: string
}


function validateEmpty() {
    return function (name: string, value: string, setErrors: React.Dispatch<React.SetStateAction<Record<string, object>>>) {
        if (value.length === 0) {
            return setErrors((prevErrors) => ({ ...prevErrors, [name]: {...prevErrors[name], empty: `${capitalize(name)} field cannot be empty`}}));
        }

        setErrors((prevErrors) =>({ ...prevErrors, [name]: { ...prevErrors[name], empty: '' } }));
    };
}

function validateLength(min: number, max: number) {
    return function (name: string, value: string, setErrors: React.Dispatch<React.SetStateAction<Record<string, object>>>) {
        if (value.length < min || value.length > max ) {
            return setErrors((prevErrors) => ({ ...prevErrors, [name]: {...prevErrors[name], length: `${capitalize(name)} must be at between ${min} and ${max} characters long`}}));
        }

        setErrors((prevErrors) =>({ ...prevErrors, [name]: { ...prevErrors[name], length: '' } }));
    };
}

function validatePattern(patternValidator: ValidationPatternObject) {
    return function (name: string, value: string, setErrors: React.Dispatch<React.SetStateAction<Record<string, object>>>) {
        if (!patternValidator.pattern.test(value)) {
            return setErrors((prevErrors) => ({ ...prevErrors, [name]: { ...prevErrors[name], pattern: patternValidator.message }}));
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: { ...prevErrors[name], pattern: '' } }));
    };
}

function validatePasswords(password: string) {
    return function (name: string, otherPassword: string, setErrors: React.Dispatch<React.SetStateAction<Record<string, object>>>) {
        if (password !== otherPassword) {
            return setErrors((prevErrors) => ({ ...prevErrors, [name]: { ...prevErrors[name], match: 'Passwords do not match' } }));
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: { ...prevErrors[name], match: '' } }))
    }
}

export { validateLength, validatePattern, validateEmpty, validatePasswords }