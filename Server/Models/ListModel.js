const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "a List must have a title"],
        trim:true,
        unique:true,
    },
    targetDate:{
        type:Date,
        required:[true, "a List must have a target date"],
    }
});

const List = mongoose.model("List", listSchema);

module.exports = List;