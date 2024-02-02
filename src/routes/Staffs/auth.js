import express from 'express';
import jwt from 'jsonwebtoken';
import { StaffsModel } from '../../models/Staffs/Staffs.js';

const staffsAuthRoutes = express.Router();

const secret = "secret";

staffsAuthRoutes.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await StaffsModel.findOne({ username });

    if (!user) {
        return res.json({message: "Staff does not exist!"});
    }
    else if (password !== user.password) {
        return res.json({message: "password is incorrect!"})
    }
    const token = jwt.sign({ id: user._id }, secret);
    res.json({ token, userID: user._id });
});

export default staffsAuthRoutes;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, secret, (err) => {
        if (err) {
          return res.sendStatus(403);
          console.log(err);
        }
        next();
      });
    } else {
      res.sendStatus(401);
      console.log(401);
    }
};