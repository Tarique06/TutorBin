const express = require("express");
const Controller = require("../controller/index");
const auth = require("../auth/auth");

const router = express.Router();

router.post("/user/register", Controller.UserController.signup);
router.post("/user/signin", Controller.UserController.signin);
router.put("/user/update/:_id", auth, Controller.UserController.updateUser);
router.delete("/user/delete/:_id", auth, Controller.UserController.deleteUser);

module.exports = router;
