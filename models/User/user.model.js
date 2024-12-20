import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        //     required:true
    },
    role: {
        type: String,
        enum: ["ADMIN", "SUPERADMIN"],
        default: "ADMIN",
    },

    password: {
        type: String,
        required: true,
    },

    phoneno: {
        type: Number,
        //   required: true,
    },
    countryCode: {
        type: Number,
    },
    profilePic: {
        type: String
    },

}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)