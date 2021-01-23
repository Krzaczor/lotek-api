import Joi from '@hapi/joi';
import mongoose from 'mongoose';
// import mongoPugination from 'mongo-cursor-pagination';
import * as setting from '../setting';

const drawsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        min: setting.minId,
    },
    time: {
        type: Date,
        required: true,
        unique: true,
        min: setting.minDateAsInt,
    },
    numbers: [{
        type: Number,
        required: true,
        min: setting.minNumber,
        max: setting.maxNumber,
    }]
});

export default mongoose.model('draws', drawsSchema);
