import Joi from '@hapi/joi';
import * as setting from '../../setting';

//number schema in numbers array
const JoiNumberSchema = Joi.number()
    .integer()
    .min(setting.minNumber)
    .max(setting.maxNumber)
    .messages({
        'number.base': 'Podaj same liczby',
        'number.integer': 'Tylko liczby całkowite',
        'number.min': `Największą liczbą może być ${setting.minNumber}`,
        'number.max': `Najmnieszją liczbą może być ${setting.maxNumber}`,
    });

//numbers schema in body request
const JoiNumbersSchema = Joi.array()
    .length(setting.countDraw)
    .empty()
    .items(JoiNumberSchema)
    .unique((a, b) => a === b)
    .required()
    .messages({
        'array.base': 'Nie podano liczb',
        'any.required': 'Nie podano liczb',
        'any.empty': 'Nie podano liczb',
        'array.length': `Podaj dokładnie ${setting.countDraw} liczb`,
        'array.unique': 'Liczby nie mogą się powtarzać'
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

const JoiWinersSchema = Joi.array()
    .items(Joi.object({
        type: Joi.number().required(),
        count: Joi.number().required(),
        prize: Joi.number().required(),
    })).allow(null);

//body schema in request POST /draws
const JoiBodySchema = Joi
    .object().keys({
        time: JoiTimeSchema,
        numbers: JoiNumbersSchema,
        winers: JoiWinersSchema,
    })

export default (body) => JoiBodySchema.validateAsync(body, { abortEarly: false });