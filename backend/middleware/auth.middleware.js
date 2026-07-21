import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization; //first we will take the headers from request
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //validating as if the header is not empty
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; //splitting the token(header)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoding those as such it matches
    req.userId = decoded.userId;
    next(); //if everything is fine, we will proceed towards next
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token provided" });
  }
};
