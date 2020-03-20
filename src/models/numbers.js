import mongoose from 'mongoose';

const numbersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 49
    },
    draws: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'draws',
        required: true
    }]
});

numbersSchema.pre('validate', function (next) {

    // Only int number
    if (parseInt(this.value) !== this.value) {
        throw new Error('Tylko liczba całkowita!')
    }

    next();
});

export default mongoose.model('numbers', numbersSchema);
