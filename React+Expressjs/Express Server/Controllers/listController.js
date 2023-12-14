const List = require('./../Models/listModel');
const catchAsync = require('./../utils/catchAsync');
const Cryption = require('../utils/Cryption');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

exports.createList = catchAsync(async (req, res, next) => {
    const text = {
        "iv": Buffer.from(process.env.IV, 'hex'),
        "encryptedData": req.params.encryptedData
    }
    const user_id = Cryption.decrypt(text);
    const newList = await List.create({
        userId: user_id,
        title: req.body.title,
        description: req.body.description,
        targetDate: req.body.targetDate,

    });

    res.status(201).json({
        status: 'success',
        data: {
            list: newList,
        }
    })
})

exports.getAllLists = catchAsync(async (req, res, next) => {
    const text = {
        "iv": Buffer.from(process.env.IV, 'hex'),
        "encryptedData": req.params.encryptedData
    }
    const user_id = Cryption.decrypt(text);

    const lists = await List.find({ userId: user_id });

    res.status(200).json({
        status: 'success',
        data: {
            lists
        }
    });
});

exports.updateList = catchAsync(async (req, res, next) => {
    const listId=req.params.listId;
    const list = await List.findByIdAndUpdate(listId, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            list
        }
    });
});

exports.deleteList = catchAsync(async (req, res, next) => {
    await List.findByIdAndDelete(req.params.listId);
    res.status(200).json({
        status: 'success',
        data: null,
    });
});