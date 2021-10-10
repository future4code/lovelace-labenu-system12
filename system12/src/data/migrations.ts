import { connection } from "./connection"
import students from "./students.json"
import classes from "./classes.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

      CREATE TABLE IF NOT EXISTS Skills (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS Students (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         birthDate DATE NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         hobbies VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Professors (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         birthDate DATE NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         skills_id VARCHAR(255),
         FOREIGN KEY (skills_id) REFERENCES Skills (id)
      );
      
      CREATE TABLE IF NOT EXISTS Classes (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         startingDate DATE NOT NULL,
         endingDate DATE NOT NULL,
         actualModule INT NOT NULL,
         professor_id VARCHAR(255),
         student_id VARCHAR(255),
         FOREIGN KEY (professor_id) REFERENCES Professors (id),
         FOREIGN KEY (student_id) REFERENCES Students (id)
      );

      
   `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const insertStudents = () => connection("Students")
   .insert(students)
   .then(() => { console.log("Usuários criados") })
   .catch(printError)

const insertClasses = () => connection("Classes")
   .insert(classes)
   .then(() => { console.log("Turmas criadas") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertStudents, insertClasses)
   .finally(closeConnection)