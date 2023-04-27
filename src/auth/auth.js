// const jwt = require("jsonwebtoken")
// const secretKey = "This-is-a-secret-key"

// const authorization = (req, res, next) => {
//     const token = req.headers.authorization
//     if (!token) {
//         return res.status(401).json({ message: "User not authorized" })
//     }
//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: err.message })
//         }
//         console.log(decoded);
//         req.user = decoded.data;
//         next()
//     })
// }

// module.exports = authorization;

// console.log('working.......')

const jsw = require("jsonwebtoken");

const tokenVarification = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jsw.verify(token, "This-is-a-secret-key", (err, decode) => {
      if (err) {
        return res.status(403).json({
          status: "filed/ login againn",
        });
      }
      req.userID = decode.data;
      // console.log("auth working...");
      next();
    });
  } else {
    res.json({
      status: "failed",
      messege: "token missing",
    });
  }
};

module.exports = tokenVarification;
