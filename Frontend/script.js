async function buscarFilmes() {
    // através do acesso a rota GET, trazer os filmes e mostrar na tela
    const resposta = await fetch("https://to-do-masson.vercel.app/")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")
    
    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.nomeFilme}</h2>
                <p><strong>Gênero:</strong> ${filme.gênero}</p>
                <p><strong>Duração:</strong> ${filme.duração} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classificaçãoEtária > 0 ? filme.classificaçãoEtária + ' anos' : 'Livre'}</p>
            </div>
        `
    })
}

buscarFilmes()