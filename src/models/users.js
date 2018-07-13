import mongoose from 'mongoose'

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ip: {
        type: String,
    },
    faveSnack: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        required: true
    }
})

const UserSchema = mongoose.model('User', User)

export { UserSchema }