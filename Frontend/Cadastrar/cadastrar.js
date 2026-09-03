const button = document.querySelector("button")

button.addEventListener("click", cadastrarFilme)

async function cadastrarFilme() {
    // pegar as informações do formulário e enviar para o backend
    const title = document.getElementById("title").value
    const gender = document.getElementById("gender").value
    const ageLimit = document.getElementById("ageLimit").value
    const duration = document.getElementById("duration").value

    if (title === "" || gender === "" || ageLimit === "" || duration === "") {
        alert("Preencha todas as informações!")
        return
    }

    const filme = {
        title,
        gender,
        ageLimit,
        duration
    }

    const resposta = await fetch("https://backend-filmes03mc.vercel.app/create", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const respostaJS = await resposta.json()

    alert(respostaJS.message)

    window.location.href = "../index.html"
}