import Joi from '@hapi/joi';
import * as setting from '../../setting';

//number schema in numbers array
const JoiNumberSchema = Joi.number()
    .integer()
    .min(setting.minNumber)
    .max(setting.maxNumber)
    .messages({
        'number.base': 'Podaj same liczby',
        'number.min': `Największą liczbą musi być ${setting.minNumber}`,
        'number.max': `Najmnieszją liczbą musi być ${setting.maxNumber}`,
    });

const checkRepeatValues = (a, b) => a === b;

//numbers schema in body request
const JoiNumbersSchema = Joi.array()
    .length(setting.lengthDraw)
    .empty()
    .items(JoiNumberSchema)
    .unique(checkRepeatValues)
    .required()
    .messages({
        'array.base': 'Podano niepoprawne dane',
        'any.required': 'Nie podano liczb',
        'any.empty': 'Nie podano żadnych liczb',
        'array.length': `Podaj dokładnie ${setting.lengthDraw} liczb`,
        'array.unique': 'Liczby nie mogą się powtarzac'
    })

//time schema in body request
const JoiTimeSchema = Joi.date()
    .iso()
    .min(setting.minDateAsInt)
    .required()
    .messages({
        'any.required': 'Nie podano daty',
        'date.base': 'Niepoprawna data',
        'date.format': 'Niepoprawny format daty',
        'date.min': 'Data nie może być mniejsza niż 26.01.1957'
    })

//body schema in request POST /draws
const JoiBodySchema = Joi
    .object().keys({
        time: JoiTimeSchema,
        numbers: JoiNumbersSchema
    })

export default (body) => JoiBodySchema.validateAsync(body, { abortEarly: false });