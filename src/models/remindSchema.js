import mongoose from 'mongoose';

const remindSchema = new mongoose.Schema({
    userId: { type: String },
    reminder: { type: String },
    timer: { type: Date },
});

export default mongoose.model('Reminders', remindSchema);