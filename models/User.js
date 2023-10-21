import mongoose from "mongoose";

import { Schema } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    phone: {
        type: Schema.Types.Number,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created', // Use `created_at` to store the created date
        updatedAt: 'updated' // and `updated_at` to store the last updated date
    }

})

const User = mongoose.model('User', UserSchema);
export default User
