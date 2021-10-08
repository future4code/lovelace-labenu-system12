import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Class } from "../types";

export default async function createClass(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, startingDate, endingDate, actualModule } = req.body

      if (!name || !startingDate || !endingDate || !actualModule ) {
         res.statusCode = 422
         throw "'name', 'startingDate', 'endingDate' e 'actualModule' são obrigatórios"
      }

      const id: string = Date.now().toString()

      const newClass: Class = { id, name, startingDate, endingDate, actualModule }

      await connection('Classes').insert(newClass)

      res.status(201).send("Turma criada!")

   } catch (error: any) {

      if (typeof error === "string") {

         res.send(error)
      } else {
         
         console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Um erro inesperado ocorreu =/")
      }

   }
}