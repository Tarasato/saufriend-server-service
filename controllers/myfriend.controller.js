//File that writes control operations for a table in the database
//uae myfriend_tb

const Myfriend = require("./../models/myfriend.model.js");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

//fuction insert data to myfriend_tb
exports.createMyfriend = async (req, res) => {
  try {
    let data = {
      ...req.body,
      myfriendImage: req.file
        ? req.file.path.replace("images\\myfriend\\", "")
        : "",
    };

    const result = await Myfriend.create(data);

    res.status(201).json({
      message: "Myfriend created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func get all friends in myfriend_tb
exports.getAllMyfriend = async (req, res) => {
    try {
      const result = await Myfriend.findAll({
        where: {
          userId: req.params.userId,
        },
      });
      if (result) {
        res.status(200).json({
          message: "Myfriend get successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "Myfriend get failed",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  //func edit friend in myfriend_tb
exports.editMyfriend = async (req, res) => {
    try {
      let data = {
        ...req.body,
      };
      if (req.file) {
        const myfriend = await Myfriend.findOne({
          where: {
            myfriendId: req.params.myfriendId,
          },
        });
  
        if (myfriend.myfriendImage) {
          const oldImagePath = "images/myfriend/" + myfriend.myfriendImage;
          fs.unlink(oldImagePath,(err) => {console.log(err)});
        }
        data.myfriendImage = req.file.path.replace("images\\myfriend\\", "");
      }else{
          delete data.myfriendImage
      }
      const result = await Myfriend.update(data, {
        where: {
            myfriendId: req.params.myfriendId,
        },
      });
      res.status(200).json({
        message: "Myfriend updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  //func delete one friend in myfriend_tb
exports.deleteMyfriend = async (req, res) => {
    try {
        const myfriend = await Myfriend.findOne({
          where: {
            myfriendId: req.params.myfriendId,
          },
        });
  
        if (myfriend.myfriendImage) {
          const oldImagePath = "images/myfriend/" + myfriend.myfriendImage;
          fs.unlink(oldImagePath,(err) => {console.log(err)});
      }
      const result = await Myfriend.destroy({
        where: {
            myfriendId: req.params.myfriendId,
        },
      });
      res.status(200).json({
        message: "Myfriend deeleted successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  //Myfriends Image upload function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/myfriend");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        "myfriend_" +
          Math.floor(Math.random() * Date.now()) +
          path.extname(file.originalname)
      );
    },
  });
  exports.uploadMyfriend = multer({
    storage: storage,
    limits: {
      fileSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb("Error: Images Only!");
    },
  }).single("myfriendImage");
  