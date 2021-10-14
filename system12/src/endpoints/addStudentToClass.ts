import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Student } from "../types";
import { Class } from "../types";

export default async function createStudent(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, birthDate, email, hobbies } = req.body

      if (!name || !birthDate || !email || !hobbies) {
         res.statusCode = 422
         throw "'name', 'birthDate', 'email' e 'hobbies' são obrigatórios"
      }

      const id: string = Date.now().toString()

      const newStudent: Student = { id, name, birthDate, email, hobbies, }

      await connection('Students').insert(newStudent)

      res.status(201).send("Usuário criado!")

   } catch (error: any) {

      if (typeof error === "string") {

         res.send(error)
      } else {
         
         console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Um erro inesperado ocorreu =/")
      }

   }
}