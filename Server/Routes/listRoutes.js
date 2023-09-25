const express = require("express");
const listController= require('./../Controllers/listController')
const router = express.Router();
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use(express.json());


router.route("/").get(listController.getAllLists).post(listController.postList);

router
  .route("/:id")
  .get(listController.getUniqueList)
  .patch(listController.updateList)
  .delete(listController.deleteList);

  module.exports = router;