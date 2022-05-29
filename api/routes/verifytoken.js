const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      err && res.status(403).json("Invalid token!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
//check if user is logged in
const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};

//check if user is admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    req.user.admin ? next() : res.status(403).json("access denied");
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAuthorization,
};
