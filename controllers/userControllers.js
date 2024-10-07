// libraries
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/userModels");

// Connection String
const uri =
  "mongodb+srv://vjpmongodb:vjpmongodb@cluster0.pakwt.mongodb.net/todo?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  
// http://localhost:3000/postdata?fname=Vashishth&lname=Pathak&email=pathakvashishth06%40gmail.comm&comment=-
const postData = (req, res) => {
  async function run() {
    let query = require("url").parse(req.url, true).query;
    console.log(query);

    const newUser = new User({
      firstName: query.fname,
      lastName: query.lname,
      email: query.email,
      comment: query.comment,
    });

    try {
      await newUser.save();
      console.log("User data stored");
      let resObj = {
        status: "Succuss",
        statusCode: 201,
        message: "Data Added Succussfully",
        data: newUser,
        error: "no",
      };
      res.json(resObj);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  run().catch(console.dir);
};

// http://localhost:3000/getdata
const getData = (req, res) => {
  async function run() {
    try {
      const users = await User.find().lean(); // Use lean() to get plain objects
      const usersArray = users;

      if (users == "") {
        let resObj = {
          status: "No Data Found",
          statusCode: 204,
          message: "No Data",
          error: "Yes",
        };
        res.json(resObj);
      } else {
        // Variable to store user data
        const usersData = [];

        // Loop through the users array and extract data
        for (const user of usersArray) {
          // Store the desired data in a variable (excluding __v)
          const { _id, firstName, lastName, email, comment } = user;
          usersData.push([_id, firstName, lastName, email, comment]);
        }

        // Output the stored data
        console.log(usersData);

        let resObj = {
          status: "success",
          statusCode: 200,
          message: "OK",
          usersData,
          error: null,
        };
        res.json(resObj);
      }
    } catch (error) {
      res.status(500);
    }
  }

  run().catch(console.dir);
};

// http://localhost:3000/updatedata?id=6703e1afc09ebcf4eacdd0bb&fname=Vashishth&lname=Pathak&email=pathakvashishth06%40gmail.comm&comment=-
const putUpdateData = (req, res) => {
  async function run() {
    try {
      let query = require("url").parse(req.url, true).query;
      const userId = query.id; // Get user ID from the request parameters
      console.log(userId);

      let data = {
        firstName: query.fname,
        lastName: query.lname,
        email: query.email,
        comment: query.comment,
      };

      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true, // Returns the updated document
        runValidators: true, // Runs schema validations for the updated data
      });

      if (!updatedUser || updatedUser == null || updatedUser == "") {
        // Check for null instead of an empty string
        let resObj = {
          status: "Failed",
          statusCode: 404,
          message: "User ID not found",
          data: data,
          error: "yes",
        };
        res.json(resObj);
      } else {
        let resObj = {
          status: "Success",
          statusCode: 200,
          message: "Data Updated",
          data: data,
          error: "no",
        };
        res.json(resObj);
      }
    } catch (error) {
      res.status(500);
    }
  }

  run().catch(console.dir);
};

module.exports = { postData, getData, putUpdateData };