import mongoose from 'mongoose';

const remindSchema = new mongoose.Schema({
    userId: String,
    reminder: String,
    timer: Date,
});

export default mongoose.model('Reminders', remindSchema);