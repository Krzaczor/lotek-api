import mongoose from 'mongoose';

const drawsSchema = {
    type: Number,
    min: 1,
    max: 49
};

export default mongoose.model('draws', drawsSchema);
