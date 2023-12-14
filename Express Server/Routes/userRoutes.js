const express = require("express");
const userController = require('./../Controllers/userController');
const authController = require('./../Controllers/authController');
const passwordController=require('./../Controllers/passwordController');
const listController=require('./../Controllers/listController');
const router = express.Router();
const fs = require("fs");

const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword',passwordController.forgotPassword);
router.post('/todo/newList/:encryptedData',listController.createList);
router.get("/todo/getAllLists/:encryptedData",listController.getAllLists);
router.delete("/todo/deleteList/:listId",listController.deleteList);
router.route("/:id").get(userController.getUniqueUser).delete(userController.deleteUser);
router.route("/:encryptedData").patch(passwordController.updatePassword);

module.exports = router;
