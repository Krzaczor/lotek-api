import Joi from 'joi';
import * as setting from '../../setting';

const JoiNumberSchema = Joi
    .number()
    .integer()
    .min(setting.minNumber)
    .max(setting.maxNumber)
    .required()
    .error(() => {
        throw new Error(`liczby muszą być całkowite oraz z przedziału od ${setting.minNumber} do ${setting.maxNumber}`)
    })

const checkRepeatValues = (a, b) => {
    if (a === b) {
        throw new Error('liczby nie mogą się powtarzać.')
    }
};

const JoiSchemaBody = Joi.object().keys({
    time: Joi
        .date()
        .min(setting.minDateAsInt)
        .required()
        .error(() => {
            throw new Error('nieprawidłowa data losowania')
        }),
    numbers: Joi
        .array()
        .length(setting.lengthDraw)
        .items(JoiNumberSchema)
        .unique(checkRepeatValues)
        .required()
}).error(() => {
    throw new Error('niepełne dane')
})

export const bodyValidate = (body) => Joi.validate(body, JoiSchemaBody);