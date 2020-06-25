const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/dev.config");

module.exports = async (req, res, next) => {
  try {
    let { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    //authorization = authorization.replace("Bearer","");
    const decode = await jwt.verify(authorization, jwtKey);
    req.userData = decode;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Auth Failed" });
  }
};
