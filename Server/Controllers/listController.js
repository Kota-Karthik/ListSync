const fs = require("fs");
const List = require("../Models/ListModel");

const express = require("express");
const app = express();

app.use(express.json());

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json({
      status: "success",
      results: lists.length,
      data: {
        lists,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUniqueList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        list,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.postList = async (req, res) => {
  try {
    const newList = await List.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        list: newList,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      messsage: err,
    });
  }
};

exports.updateList = async (req, res) => {
  const listId = req.params.id;
  const updatedData = req.body;
  try {
    const list = await List.findByIdAndUpdate(listId, updatedData , {
      new: true,
      runValidators: true,
    });
    if (!list) {
      console.log("no list is found with the provided ID");
      return res.status(404).json({
        status: "fail",
        message: "List not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        
        list,
      },
    });
  } catch (err) {
    
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
