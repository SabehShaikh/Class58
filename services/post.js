import Post from "../models/Post.js"
import mongoose from "mongoose"

const addPost = async (data) => {
    const post = new Post(data)
    return await post.save()
}

const getAllPost = async (skip = 5, limit = 5) => {
    // return await Post.find({}).populate("author", "name email");
    return await Post.aggregate([
        // {
        //     $match: { author: new mongoose.Types.ObjectId("651ac754ee491116d30f0ff1") }
        // }
        // {
        //     $lookup: {
        //         from: "users", // kis collection se lana ha
        //         localField: "author",
        //         foreignField: "_id",
        //         as: "author"
        //     }
        // }
        {
            $facet: {
                total: [{
                    $count: 'create'
                }],
                data: [{
                    $addFields: {
                        _id: '$_id'
                    },

                }],
            },
        },
        {
            $unwind: '$total'
        },
        {
            $project: {
                data: {
                    $slice: ['$data', skip, {
                        $ifNull: [limit, '$total.create']
                    }]
                },
                meta: {
                    total: '$total.create',
                    limit: {
                        $literal: limit
                    },
                    currentPage: {
                        $literal: ((skip / limit) + 1)
                    },
                    totalPages: {
                        $ceil: {
                            $divide: ['$total.create', limit]
                        }
                    },
                },
            },
        },
    ])
}

export {
    addPost,
    getAllPost
}