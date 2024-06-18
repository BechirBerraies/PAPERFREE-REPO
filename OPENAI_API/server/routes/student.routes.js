const StudentController =require('../controllers/student.controller');


module.exports= app=>  {
    app.post('/Student',StudentController.createStudent)
    app.post('/Student/login', StudentController.login)
    app.post('/Student/register', StudentController.register)
    app.post('/Student/logout', StudentController.logout)
    app.get('/Student',StudentController.findAllStudents)
    app.get('/Student/:id',StudentController.finOneStudent)
    app.put('/Student/:id', StudentController.updateStudent)
    app.delete('/Student/:id',StudentController.deleteStudent)
}


