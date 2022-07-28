const Model = require("../model/index");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password)
        return res
          .status(400)
          .json({ success: false, error: "Please fill all fields" });
      const isExist = await Model.User.findOne({ email: email });
      if (isExist)
        return res
          .status(400)
          .json({ success: false, error: "Email already exist" });
      const admin = new Model.User({
        firstName,
        lastName,
        email,
        password,
      });
      const saveAdmin = await admin.save();
      res
        .status(200)
        .json({ success: true, message: "Signup success", data: saveAdmin });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .json({ success: false, error: "All fields required" });
      const isExist = await Model.User.findOne({ email: email });
      if (!isExist)
        return res.status(400).json({
          success: false,
          error: "Email doesn't exist. Please signup",
        });
      isExist.comparePassword(password, (match) => {
        if (!match)
          return res
            .status(401)
            .json({ success: false, error: "Invalid password" });
        const token = jwt.sign({ _id: isExist._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "Login success",
          data: isExist,
          token,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },

  async updateUser(req, res) {
    try {
      let userUpdate = await Model.User.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true }
      );
      res.status(202).json({
        userUpdate,
        message: "User updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
};
