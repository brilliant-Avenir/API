import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
    classname: { type: String, required: true, unique: true },
    teacher: { type: String, required: true },
    no_of_pupils: { type: String, unique: true },
    subjectName: { type: String, unique: true},
    subjectName1: { type: String, unique: true},
    subjectName2: { type: String, unique: true},
    subjectName3: { type: String, unique: true},
    subjectName4: { type: String, unique: true},
    subjectName5: { type: String, unique: true},
    subjectName6: { type: String, unique: true},
    subjectName7: { type: String, unique: true},
    subjectName8: { type: String, unique: true},
    subjectName9: { type: String, unique: true},
    subjectName10: { type: String, unique: true},
    subjectName11: { type: String, unique: true},
    subjectName12: { type: String, unique: true},
    subjectName13: { type: String, unique: true},
    subjectName14: { type: String, unique: true},
    subjectName15: { type: String, unique: true},
    subjectName16: { type: String, unique: true},
    subjectName17: { type: String, unique: true},
    subjectName18: { type: String, unique: true},
    subjectName19: { type: String, unique: true},
    subjectName20: { type: String, unique: true}
});

export const ClassesModel = mongoose.model("classes", classesSchema);