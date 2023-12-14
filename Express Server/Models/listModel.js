const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const listSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: [true, 'please tell us the title'],
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'please tell us the description'],
        minlength: 8,
        select: false,
    },
    targetDate: {
        type: Date,
        required: [true, "list needs a expiry date"],

    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
},
   { timestamps: true }
);

const List = mongoose.model('List', listSchema);

module.exports = List;
