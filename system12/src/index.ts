import app from "./app"
import createProfessor from "./endpoints/createProfessor"
import createStudent from './endpoints/createStudent'

app.post('/student/signup', createStudent)
app.post('/professor/signup', createProfessor)