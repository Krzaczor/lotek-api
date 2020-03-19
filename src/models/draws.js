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
        min: 1,
        max: 49,
        required: true
    }]
});

drawsSchema.pre('save', function (next) {
    this.numbers.forEach(nr => {
        if (parseInt(nr) == NaN) {
            throw new Error('W lotka grasz debilu. Tam muszą być liczby!')
        }
    });

    // Array must have length 6
    if (this.numbers.length !== 6) {
        throw new Error('Musi być kurwa 6 liczb debilu, bo nie przyjmą ci kuponu i chuja wygrasz, a nie hajs!')
    }

    // Numbers in array without duplicate
    this.numbers.forEach((nr, index, self) => {
        if (self.indexOf(nr) !== index) {
            throw new Error('Jak możesz debilu 2 razy zaznazyć tę samą liczbę, mądry ty kurwa jesteś?')
        }
    });

    next();
});

export default mongoose.model('draws', drawsSchema);
