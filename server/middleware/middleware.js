import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedData = jwt.verify(token, JWT_SECRET);

    req.id = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
