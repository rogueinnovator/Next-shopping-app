const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "alchmh1islfail";
//creates a user using post :/api/auth/createuser no log in required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  // if there are error this will return bad request
  async (req, res) => {
    let success = false;
    //request and response object
    const count = await User.countDocuments();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check if there is duplicate user
      let user = await User.findOne({ email: req.body.email }); //By using the await keyword before calling this method,
      //you’re telling JavaScript to pause execution of the current function until the Promise returned by
      //this method resolves. Once it resolves, its result will be assigned to the user variable and
      //execution of the function will continue.
      if (user) {
        // console.log(user);
        return res.status(400).json({
          success,
          error: "sorry a user with this email exist ",
          count,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });

      //     .then((user) => res.json(user))
      //     .catch((err) => {
      //       console.log(err);
      //       res.json({ error: "please enter a unique value  ", message: err.message });
      const data = {
        //on return of authtoken we convet it back to the data and also we can find if someone had tampered it or not(with the help of our secret key)
        user: {
          id: user.id,
          name: user.name,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //this is a synch meyhod
      success = true;
      // console.log(jwtData);
      // res.json({ "nice ": "nice", count, user }); //this wil print the message in the response section of the thunder client
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, " internal server error ");
    }
  }
);

// router.delete("/user", async (req, res) => {
//   try {
//     await User.deleteOne({
//       name: "huzaifa",
//       email: "sadaatkhan@gmail.com",
//       password: "2333323",
//     });
//     res.status(200).send("User deleted successfully");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// })
//Authenticate a user using post /api/auth/login : no log in required
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password can't be empty").exists(),
  ],
  // if there are error this will return bad request
  async (req, res) => {
    let success = false;
    //request and response object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "try to log in with correct credientials " });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "try to log in with correct credientials " });
      }
      const data = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.json.status(500).send(" server ke grech d bacha ");
    }
  }
);
//Route 3 : get logged in user details using post api/auth/getuser log in required
router.post("/getuser", fetchuser, async (req, res) => {
  let success = false;
  //the fetchuser modifie the res and req and after that we get a user the fetchuser authenticate the user and move to the annonymous asnc function by calling next
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //this will retrive the user credientials(except password) using the specific id and
    res.send(success, user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server ke laroo");
  }
});
module.exports = router;
