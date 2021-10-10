export type Professor = {
   id: string
   name: string
   birthDate: string
   email: string
   skills: Array<Skills>
}

export type Student = {
   id: string
   name: string
   birthDate: string
   email: string
   hobbies: Array<Hobbies>
}

export type Hobbies = {
   id: string
   name: string
   description: string
}

export type Skills = {
   id: string
   name: string
   description: string
}

export type Class = {
   id: string
   name: string
   startingDate: string
   endingDate: string
   professorsList?: Array<Professor>
   studentsList?: Array<Student>
   actualModule: number
}