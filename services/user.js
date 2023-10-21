import User from "../models/User.js"

const getAllUsers = async () => {
    return await User.find();
}

export {
    getAllUsers
}