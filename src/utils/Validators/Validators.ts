export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if (value) return undefined
    return 'Обязательное к заполнению поле'
}

export const  maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `Максимальное количество знаков должно равняться ${maxLength}`
    return undefined
}