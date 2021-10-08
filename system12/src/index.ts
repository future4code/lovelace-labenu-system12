import app from "./app"
import createProfessor from "./endpoints/createProfessor"
import createStudent from './endpoints/createStudent'
import createClass from './endpoints/createClass'

app.post('/student/signup', createStudent)
app.post('/professor/signup', createProfessor)
app.post('/class/create', createClass)