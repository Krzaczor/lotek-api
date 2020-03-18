import mongoose from 'mongoose';

const numbersSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
        min: 1,
        max: 49
    },
    value: {
        type: Number,
        require: true,
        unique: true,
        min: 1,
        max: 49
    }
});

export default mongoose.model('numbers', numbersSchema);
