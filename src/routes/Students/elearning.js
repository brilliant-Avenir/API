import express from 'express';
import jwt from 'jsonwebtoken';

const elearningRoutes = express.Router();

elearningRoutes.get('/', (req, res) => res.send('Hmm, wow.')
);

export default elearningRoutes;