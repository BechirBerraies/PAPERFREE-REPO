const Student = require('../models/Student.model');
const jwt = require('jsonwebtoken');
const SECRET = "2048";

module.exports={


    findAllStudents:(req,res)=>{
        Student.find()
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(400).json(error))
    },
    createStudent:(req,res)=>{
        Student.create(req.body)
        .then(response=>res.status(201).json(response))
        .catch(error=>res.status(400).json(error.errors))
    },
    finOneStudent:(req,res)=>{
        Student.findOne({_id:req.params.id})
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(404).json(error))
    },
    updateStudent:(req,res)=>{
        Student.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(400).json(error))
    },
    deleteStudent:(req,res)=>{
        Student.findByIdAndDelete({_id:req.params.id})
        .then(response=>res.status(200).json(response))
        .catch(error=>res.status(400).json(error))
    },
    register: async (req, res) => {
        try {
            const newStudent = new Student(req.body);
            const savedStudent = await newStudent.save();
            const studentToken = jwt.sign({ id: savedStudent._id }, SECRET);
            res.status(201).cookie("StudentToken", studentToken, { httpOnly: true }).json(savedStudent);
        } catch (error) {
            res.status(400).json(error);
            console.log(error);
        }
    },
    login: async (req, res) => {
        const StudentFromDB = await Student.findOne({ email: req.body.email });
        if (!StudentFromDB) {
            res.status(404).json({ error: "Student NOT FOUND" })
        } else {
            try {
                if (req.body.password == StudentFromDB.password ) {
                    const StudentToken = jwt.sign({id: StudentFromDB._id}, SECRET)
                    console.log(`Student ID ${StudentFromDB._id} \nStudentToken : ${StudentToken} `);
                    res.status(200).cookie("StudentToken", StudentToken, {httpOnly:true}).json({ message: "Student Logged in successfully !!",StudentId:StudentFromDB._id})
                } else {
                    res.status(400).json({ message: "PAssword incorrect" })
                }
            }
            catch (error) {
                res.status(400).json({ message: 'invalid email/password', error })
            }
        }
    },
    logout: async (req, res) => {
        try {
            console.log('****',req.cookies.StudentToken,'****');
            res.clearCookie("StudentToken")
            res.status(200).json({message:"Student logged out Successfully!!"})
        } catch (error) {
            str = JSON.stringify(req);
            console.log("this is req : " + str);
            console.log(error);
            res.status(500).json({message:'Somenthing went wrong', error})
            console.log(req.cookies.StudentToken);
        }
    },

}

