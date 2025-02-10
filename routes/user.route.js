//This file is used to manage routing for service/API calls
//use user_tb
const userCtrl = require("./../controllers/user.controller.js");

//call express to use router module
const express = require("express");
const router = express.Router();

router.post("/",userCtrl.uploadUser,  userCtrl.createUser);
router.get("/:userName/:userPassword", userCtrl.checkLoginUser);
router.put("/:userId", userCtrl.uploadUser,userCtrl.editUser);
router.delete("/:userId", userCtrl.deleteUser);

module.exports = router;