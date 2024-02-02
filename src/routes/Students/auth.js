import express from 'express';
import jwt from 'jsonwebtoken';
import { PupilsModel } from "../../models/Students/Pupils.js";

const studentsAuthRoutes = express.Router();

const secret = "secret";

studentsAuthRoutes.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await PupilsModel.findOne({ username });

    if (!user) {
        return res.json({message: "Pupil does not exist!"});
    }
    else if (password !== user.password) {
        return res.json({message: "password is incorrect!"})
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 1000 });
    res.json({ token, userID: user._id });
});

export default studentsAuthRoutes;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, secret, (err) => {
        if (err) {
          return res.sendStatus(403).json({ token: "no valid token" });
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
};