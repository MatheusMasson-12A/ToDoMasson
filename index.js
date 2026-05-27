import express, { request, response } from "express";

import mysql2 from "mysql2";

const app = express()

app.use(express.json())

app.get("/", (request,response) => {
    response.json({
        message: "Você acessou a rota principal"
    })
})

app.post("/create-task", (request,response) => {
    const { description, status } = request.body

    const insertCommand = "INSERT INTO ToDo_MatheusMasson(description, status) VALUES (?, ?)"

    database.query(insertCommand, [description, status], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Tarefa criada com sucesso!"
            })
        }
    })
})



const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password: "aluno@projeto",
    database: "todo_03mc"
})

app.listen(3333, () => {
    console.log("Servider online")
})