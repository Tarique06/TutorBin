const express = require("express");
const Controller = require("../controller/index");
const auth = require("../auth/auth");
const router = express.Router();

//User
router.post("/user/register", Controller.UserController.signup);
router.post("/user/signin", Controller.UserController.signin);
router.put("/user/update/:_id", auth, Controller.UserController.updateUser);
router.delete("/user/delete/:_id", auth, Controller.UserController.deleteUser);

//Task
router.post("/task/create", auth, Controller.TaskController.createTask);
router.get("/task/read", auth, Controller.TaskController.readTask);
router.get(
  "/task/read/:category",
  auth,
  Controller.TaskController.searchByCategory
);
router.put("/task/update/:_id", auth, Controller.TaskController.editTasks);
router.delete("/task/delete/:_id", auth, Controller.TaskController.deleteTask);

module.exports = router;
