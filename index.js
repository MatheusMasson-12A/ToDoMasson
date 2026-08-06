import express, { request, response } from "express";
import mysql2 from "mysql2";

const app = express()
app.use(express.json())

app.get("/", (request,response) => {
    response.json({
        message: "Você acessou a rota principal"
    })
})

app.post("/create-filme", (request,response) => {
    const { description, status } = request.body

    const insertCommand = "INSERT INTO filmes_Masson_e_Sophia(description, status) VALUES (?, ?)"

    database.query(insertCommand, [description, status], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme cadastrado com sucesso!"
            })
        }
    })
})

app.delete("/create-filme/:id", (request,response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_Masson_e_Sophia WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme apagada com sucesso!"
            })
        }
    })
})

app.get("/completed-filme", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_Masson_e_Sophia WHERE status = 1"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.get("/incompleted-tasks", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_Masson_e_Sophia WHERE status = 0"

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
    database: "alunos_filmes03MC"
})

app.listen(3333, () => {
    console.log("Servider online")
})