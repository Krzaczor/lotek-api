import mongoose from 'mongoose';

const drawsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    time: {
        type: Date,
        required: true
    },
    numbers: [{
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 49
    }]
});

drawsSchema.pre('validate', function (next) {

    // In array only int numbers
    this.numbers.forEach(nr => {
        if (parseInt(nr) !== nr) {
            throw new Error('Tylko liczby całkowite.');
        }
    });

    // Array must have length 6
    if (this.numbers.length !== 6) {
        throw new Error('Musi być 6 liczb.');
    }

    // Numbers in array without duplicate
    if (new Set(this.numbers).size !== this.numbers.length) {
        throw new Error('Liczby nie mogą się powtarzać.');
    }

    next();
});

export default mongoose.model('draws', drawsSchema);
