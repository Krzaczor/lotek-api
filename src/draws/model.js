import mongoose from 'mongoose';

const drawsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 19570127
    },
    time: {
        type: Date,
        required: true,
        unique: true
    },
    numbers: [{
        type: Number,
        required: true,
        min: 1,
        max: 49
    }]
});

drawsSchema.pre('validate', function (next) {

    // Array must have length 6
    if (this.numbers.length !== 6) {
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
