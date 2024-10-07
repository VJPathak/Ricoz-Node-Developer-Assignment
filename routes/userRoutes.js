const controller = require('../controllers/userControllers');

// User Controllers
let postData = controller.postData;
let getData = controller.getData;
let putUpdateData = controller.putUpdateData;

const express = require("express");
let router = express.Router();

// route for post data api
router
  .route("/postdata")
  .post(postData);

// route for get data api
router
  .route("/getdata")
  .get(getData);

// route for put data api
router
  .route("/updatedata")
  .put(putUpdateData);

module.exports = router;