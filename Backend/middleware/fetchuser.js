const jwt = require("jsonwebtoken");

const JWT_SECRET = "alchmh1islfail";

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to request object
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET); //this line verify the token using the secret key and after verifying it assign the payload  to data

    req.user = data.user; //the line add a new property called user to the req and assign it to the req.user
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "Invalid token" });
    }
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = fetchuser;
