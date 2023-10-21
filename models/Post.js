import mongoose from "mongoose";

import { Schema } from "mongoose";
const postSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created', // Use `created_at` to store the created date
        updatedAt: 'updated' // and `updated_at` to store the last updated date
    }

})

const Post = mongoose.model('Post', postSchema);
export default Post
