const jwt = require("jsonwebtoken");

module.exports = (req: any, res: any, next: any) => {
  console.log(req);
  const token = req.body.headers.Authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.User_Id = decode.User_Id;
    next();
  } catch (error) {
    return res.status(400).send({ error: true, msg: "AUTHENTICATION_ERROR" });
  }
};
