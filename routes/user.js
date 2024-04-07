const express = require("express");

const router = express.Router();

router.post("/user/signup", async (req, res) => {
  console.log("route =>", "/user/signup");
  console.log(req.body);
  try {
    const { username, password, email } = req.body;

    if (username && password && email) {
      const salt = await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      });
    }
  } catch (error) {}
});

module.exports = router;
