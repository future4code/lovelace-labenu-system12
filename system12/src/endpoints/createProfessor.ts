import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Professor } from "../types";

export default async function createProfessor(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, birthDate, email, skills } = req.body

      if (!name || !birthDate || !email || !skills) {
         res.statusCode = 422
         throw "'name', 'birthDate', 'email' e 'hobbies' são obrigatórios"
      }

      const id: string = Date.now().toString()

      const newProfessor: Professor = { id, name, birthDate, email, skills }

      await connection('Professors').insert(newProfessor)

      res.status(201).send("Professor adicionado com sucesso!")

   } catch (error: any) {

      if (typeof error === "string") {

         res.send(error)
      } else {
         
         console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Um erro inesperado ocorreu =/")
      }

   }
}