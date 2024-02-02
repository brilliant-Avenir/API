import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import staffsAuthRoutes from './src/routes/Staffs/auth.js';
import studentsAuthRoutes from './src/routes/Students/auth.js';

import pupilRoutes from './src/routes/Students/pupil.js';
import billsRoutes from './src/routes/Students/bills.js';
import resultsRoutes from './src/routes/Students/results.js'; 
import elearningRoutes from './src/routes/Students/elearning.js';
import newsletterRoutes from './src/routes/Students/newsletter.js';
import assignment2Routes from "./src/routes/Students/assignment.js";

import staffsRoutes from './src/routes/Staffs/staff.js';
import assignmentRoutes from './src/routes/Staffs/assignment.js';
import holidayProjectRoutes from "./src/routes/Staffs/HolidayProject.js";
import leaveRoutes from './src/routes/Staffs/leave.js';
import inboxRoutes from './src/routes/Staffs/inbox.js';
import outboxRoutes from './src/routes/Staffs/outbox.js';
import composeRoutes from './src/routes/Staffs/compose.js';
import quizRoutes from './src/routes/Staffs/quiz.js';
import tutorialsRoutes from './src/routes/Staffs/tutorials.js';
import classesRoutes from './src/routes/Staffs/classes.js';

const app = express();
const PORT = "5000";

app.use(express.json());
app.use(cors());

app.use('/staffs/login', staffsAuthRoutes);
app.use('/students/login', studentsAuthRoutes);

app.use('/pupils', pupilRoutes);
app.use('/assignment2', assignment2Routes)
app.use('/students/bills', billsRoutes);
app.use('/students/newsletter', newsletterRoutes);
app.use('/students/results', resultsRoutes);
app.use('/students/elearning', elearningRoutes);

app.use('/staffs', staffsRoutes);
app.use('/classes', classesRoutes);
app.use('/assignment', assignmentRoutes);
app.use('/hproject', holidayProjectRoutes);
app.use('/staffs/leave', leaveRoutes);
app.use('/staffs/inbox', inboxRoutes);
app.use('/staffs/outbox', outboxRoutes);
app.use('/staffs/compose', composeRoutes);
app.use('/staffs/quiz', quizRoutes);
app.use('/staffs/tutorials', tutorialsRoutes);

app.get('/', (req, res) => res.send('unathorized.'));

mongoose.connect(
    "mongodb+srv://brilliantavenirsch:gkU1PKcTEIJ6azrN@brilliant.gtpw256.mongodb.net/brilliant?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }    
);

app.listen(PORT, () => {console.log(`Server Running on http://localhost:${PORT}`)});