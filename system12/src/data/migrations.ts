import { connection } from "./connection"
import students from "./students.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

      CREATE TABLE IF NOT EXISTS Classes (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         startingDate DATE NOT NULL,
         endingDate DATE NOT NULL,
         actualModule INT(1) NOT NULL,
         professor_id VARCHAR(255) NOT NULL,
         student_id VARCHAR(255) NOT NULL,
         FOREIGN KEY (professor_id) REFERENCES Professors (id),
         FOREIGN KEY (student_id) REFERENCES Students (id)
      );

      CREATE TABLE IF NOT EXISTS Students (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         birthDate DATE NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         hobbies VARCHAR(255) NOT NULL,
         class_id VARCHAR(255),
         FOREIGN KEY (class_id) REFERENCES Classes (id)
      );

      CREATE TABLE IF NOT EXISTS Professors (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         birthDate DATE NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         class_id VARCHAR(255),
         FOREIGN KEY (class_id) REFERENCES Classes (id)
      );

      CREATE TABLE IF NOT EXISTS Skills (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         professor_id VARCHAR(255),
         FOREIGN KEY (professor_id) REFERENCES Professors (id)
      );
      
   `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const insertStudents = () => connection("Students")
   .insert(students)
   .then(() => { console.log("Usuários criados") })
   .catch(printError)

const insertClasses = () => connection("Classes")
   .insert(insertClasses)
   .then(() => { console.log("Matérias criadas") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertStudents, insertClasses)
   .finally(closeConnection)