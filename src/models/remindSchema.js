import { Schema } from 'mongoose';

const remindSchema = new Schema({
    userId: { type: String },
    reminder: { type: String },
    dateSet: { type: Date },
    remindId: { type: String }
});

export default remindSchema;