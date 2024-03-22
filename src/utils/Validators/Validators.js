export const requiredField = value => {
    if (value) return undefined;

    return 'Обязательное к заполнению поле';
}

export const  maxLengthCreator = (maxLength) => value => {
    if (value && value.length > maxLength) return `Максимальное количество знаков должно равняться ${maxLength}`;

    return undefined;
}