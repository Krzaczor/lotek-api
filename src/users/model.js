import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }
}, {
    timestamps: true
});

usersSchema.plugin(passportLocalMongoose);

export default mongoose.model('users', usersSchema);
