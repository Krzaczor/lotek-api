import Joi from '@hapi/joi';
import * as setting from '../../setting';

//number schema in numbers array
const JoiNumberSchema = Joi
    .number()
    .integer()
    .min(setting.minNumber)
    .max(setting.maxNumber)
    .required()
// .error(() => {
//     throw new Error(`Joi liczby muszą być całkowite oraz z przedziału od ${setting.minNumber} do ${setting.maxNumber}`)
// })

const checkRepeatValues = (a, b) => a === b;
// if (a === b) {
//     throw new Error('Joi: liczby nie mogą się powtarzać.')
// }
// };

//numbers schema in body request
const JoiNumbersSchema = Joi
    .array()
    .length(setting.lengthDraw)
    .items(JoiNumberSchema)
    .unique(checkRepeatValues)
    .required()

//time schema in body request
const JoiTimeSchema = Joi
    .date()
    .min(setting.minDateAsInt)
    .required()
// .error(() => {
//     throw new Error('Joi: nieprawidłowa data losowania')
// })

//body schema in request POST /draws
const JoiBodySchema = Joi.object().keys({
    time: JoiTimeSchema,
    numbers: JoiNumbersSchema
}).options({ abortEarly: false });

export default (body) => JoiBodySchema.validateAsync(body);