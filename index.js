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
    const { nomeFilme, gênero, duração, classificaçãoEtária } = request.body

    const insertCommand = "INSERT INTO filmes_MatheusMassonSophiaBatista(nomeFilme, gênero, duração, classificaçãoEtária) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [nomeFilme, gênero, duração, classificaçãoEtária], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme cadastrado com sucesso!"
            })
        }
    })
})

app.delete("/delete-filme/:id", (request,response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_MatheusMassonSophiaBatista WHERE id=?"

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
    const selectCommand = "SELECT * FROM filmes_MatheusMassonSophiaBatista WHERE status = 1"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.get("/incompleted-filme", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_MatheusMassonSophiaBatista WHERE status = 0"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.put("/update-task/:id", async (req, res) => {
    const { id } = req.params

    const selectTaskCommand = "SELECT * FROM filmes_MatheusMassonSophiaBatista WHERE id = ?"

    const task = await database.promise().query(selectTaskCommand, [id], (error, data) => {
        if (error) {
            console.log(error)
        } else {
            return data
        }
    })

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

app.listen(3333, () => {
    console.log("Servider online")
})