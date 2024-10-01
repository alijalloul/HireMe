import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, "sk");

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
