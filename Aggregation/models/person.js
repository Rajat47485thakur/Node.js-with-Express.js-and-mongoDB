const mongoose = require('mongoose');
const personSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: "Not specified"
    },
    place: {
        type: String,
        default: "Earth"
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    marks: [
        {
            subject: {
                type: String,
                default:''
            },
            marks: {
                type: Number,
                default:''
            },


        }
    ]

}, { timestamps: true });

module.exports = mongoose.model("Person", personSchema);
