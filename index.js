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

app.delete("/create-task/:id", (request,response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM ToDo_MatheusMasson WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Tarefa apagada com sucesso!"
            })
        }
    })
})

app.get("/completed-tasks", (request, response) => {
    const selectCommand = "SELECT * FROM ToDo_MatheusMasson WHERE status = 1"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.get("/incompleted-tasks", (request, response) => {
    const selectCommand = "SELECT * FROM ToDo_MatheusMasson WHERE status = 0"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
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