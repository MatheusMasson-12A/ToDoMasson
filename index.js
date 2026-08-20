import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_MatheusMassonSophiaOliveira"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            response.json(data)
        }
    })
})

app.post("/create-filme", (request, response) => {
    const { nomeFilme, gênero, duração, classificaçãoEtária } = request.body

    const insertCommand = "INSERT INTO filmes_MatheusMassonSophiaOliveira(nomeFilme, gênero, duração, classificaçãoEtária) VALUES (?, ?, ?, ?)"

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

app.delete("/delete-filme/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_MatheusMassonSophiaOliveira WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    })
})

app.put("/update/:id", (request, response) => {
    const { id } = request.params
    const { nomeFilme, gênero, duração, classificaçãoEtária } = request.body

    const updateCommand = "UPDATE filmes_MatheusMassonSophiaOliveira SET nomeFilme = ?, gênero = ?, duração = ?, classificaçãoEtária = ? WHERE id = ?"

    database.query(updateCommand, [nomeFilme, gênero, duração, classificaçãoEtária, id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme editado com sucesso!"
            })
        }
    })
})


const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MC"
})

app.listen(3333, () => {
    console.log("Servidor online")
})