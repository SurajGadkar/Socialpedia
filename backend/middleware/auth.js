import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // The front end will set the token in header authorization, we can fetch it by using header("authorization")
    let token = req.header("Authorization");

    if (!token) {
      res.status(403).send("Access Denied!");
    }

    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
