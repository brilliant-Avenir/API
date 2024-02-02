import express from 'express';
import jwt from 'jsonwebtoken';
import { StaffsModel } from "../models/Staffs/Staffs.js";

const authRoutes = express.Router();

const secret = "secret";

authRoutes.post("/", async (req, res) => {
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

export default authRoutes;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, secret, (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
};