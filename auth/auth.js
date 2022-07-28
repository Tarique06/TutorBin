const jwt = require("jsonwebtoken");
const Model = require("../model/index");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({
      error: "You must login first",
    });
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error)
      return res.status(401).json({
        error: "You must login first",
      });
    const { _id } = payload;
    try {
      const user = await Model.User.findById(_id).select("-password");
      req.user = user;
    } catch (error) {
      console.log(error);
    }
    next();
  });
};
