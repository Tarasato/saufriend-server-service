//This file is used to manage routing for service / API calls
//use travel_tb
const myfriendCtrl = require("./../controllers/myfriend.controller.js");

//call express to use router module
const express = require("express");
const router = express.Router();

router.post("/", myfriendCtrl.uploadMyfriend, myfriendCtrl.createMyfriend);
router.get("/:userId", myfriendCtrl.getAllMyfriend);
router.put("/:myfriendId", myfriendCtrl.uploadMyfriend, myfriendCtrl.editMyfriend);
router.delete("/:myfriendId", myfriendCtrl.deleteMyfriend);

module.exports = router;