import mongoose from 'mongoose';
import * as setting from '../setting';

const drawsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        min: setting.minId
    },
    time: {
        type: Date,
        required: true,
        unique: true,
        min: setting.minDateAsInt
    },
    numbers: [{
        type: Number,
        required: true,
        min: setting.minNumber,
        max: setting.maxNumber
    }]
});

drawsSchema.pre('validate', function (next) {

    // Array must have length 6
    if (this.numbers.length !== setting.lengthDraw) {
        throw new Error('Musi być 6 liczb.');
    }

    // In array only int numbers
    this.numbers.forEach(nr => {
        if (parseInt(nr) !== nr) {
            throw new Error('Tylko liczby całkowite.');
        }
    });

    // Numbers in array without duplicate
    if (new Set(this.numbers).size !== this.numbers.length) {
        throw new Error('Liczby nie mogą się powtarzać.');
    }

    next();
});

export default mongoose.model('draws', drawsSchema);
