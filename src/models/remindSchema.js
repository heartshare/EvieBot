import { Schema, model } from 'mongoose';

const remindSchema = new Schema({
    userId: { type: String },
    reminder: { type: String },
    dateSet: { type: Date },
    timer: { type: Date },
    remindId: { type: String }
});

export default model('Reminders', remindSchema);