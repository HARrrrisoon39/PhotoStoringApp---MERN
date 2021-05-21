import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const countToken = token.length < 500;

    let decode;
    if (token && countToken) {
      decode = jwt.verify(token, "testing");
      req.userId = decode?.id;
    } else {
      decode = jwt.decode(token);
      req.userId = decode?.sub;
    }

    next();
  } catch (error) {
    console.log("error");
  }
};
