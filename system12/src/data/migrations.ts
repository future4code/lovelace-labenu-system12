import { connection } from "./connection"
import users from "./users.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

      CREATE TABLE IF NOT EXISTS Students (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         birthDate VARCHAR(10) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         hobbies VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Professors (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         birthDate VARCHAR(10) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         skills VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Classes (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         startingDate VARCHAR(10) NOT NULL,
         endingDate VARCHAR(10) NOT NULL,
         professorsList VARCHAR(255) NOT NULL,
         studentsList VARCHAR(255) NOT NULL,
         actualModule NUMBER NOT NULL,
      );

   `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const insertUsers = () => connection("Students")
   .insert(users)
   .then(() => { console.log("Usuários criados") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers)
   .finally(closeConnection)