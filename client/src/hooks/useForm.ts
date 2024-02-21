import { useState } from 'react';

type ErrorTypes = {
    pattern?: string;
    length?: string;
    empty?: string;
    match?: string;
}
// errors = {username: {length: 'Username is too short', empty: 'Username field cannot be empty'}}
// values = {username: "KonImperator", password: "12345"}

export function useForm(defaultValues: Record<string, string>) {
    const defaultErrors = Object.keys(defaultValues).reduce((prev, curr) =>({...prev, [curr]: {}  }), {});
    const [values, setValues] = useState<Record<string, string>>({...defaultValues});
    const [errors, setErrors] = useState<Record<string, ErrorTypes>>(defaultErrors);

    function checkFormValidity() {
        const errorsArray = Object.values(errors).flatMap(Object.values).filter(error => error);
        const valuesArray = Object.values(values).filter(value => value);
        return (errorsArray.length === 0 || valuesArray.length === Object.values(defaultValues).length);
    }

    function hadleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    function resetForm() {
        setValues(defaultValues);
        setErrors(defaultErrors);
    }

    function setValidators(
        validators: Function[],
        e: React.FocusEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;
        validators.forEach((validator) => validator(name, value, setErrors));
    }

    return {
        values,
        errors,
        hadleChange,
        setValidators,
        resetForm,
        checkFormValidity
    };
}
