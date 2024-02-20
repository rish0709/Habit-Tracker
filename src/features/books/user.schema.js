import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    habit : String,
    status: {
        type: Array,
        'default': ["1", "1", "1", "1", "1", "1", "1"]
      }
});