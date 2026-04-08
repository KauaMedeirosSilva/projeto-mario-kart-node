//Declarar Diversos Jogadores
const players = [
    {
        nome : "Luigi",
        velocidade : 3,
        manobrabilidade : 4,
        poder : 4,
        pontos : 0,
    },
    {
        nome : "Mario",
        velocidade : 4,
        manobrabilidade : 3,
        poder : 3,
        pontos : 0,
    },
    {
        nome : "Peach",
        velocidade : 3,
        manobrabilidade : 4,
        poder : 2,
        pontos : 0,
    },
    {
        nome : "Yoshi",
        velocidade : 2,
        manobrabilidade : 4,
        poder : 3,
        pontos : 0,
    },
    {
        nome : "Bowser",
        velocidade : 5,
        manobrabilidade : 2,
        poder : 5,
        pontos : 0,
    },
    {
        nome : "Donkey Kong",
        velocidade : 2,
        manobrabilidade : 2,
        poder : 5,
        pontos : 0,
    },
]

//Realiza o sorteio dos jogadores
async function drawPlayers(characters) {
    const size = characters.length
    let p1 = 0
    let p2 = 0

    while(p1 === p2){
        p1 = Math.floor(Math.random() * size) 
        p2 = Math.floor(Math.random() * size)
    };

    //retorna um vetor de objeto do tipo PLAYERS na posição PX, PLAYERS[P1] 
    return [characters[p1], characters[p2]]
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1; 
};

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "RETA"
            break
        
        case random < 0.66:
            result = "CURVA"
            break

        default:
            result = "CONFRONTO"
    }

    return result
}

async function logRollResult (characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        //sortear bloco 
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        //rolar dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //Teste de Habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block == "RETA"){
            totalTestSkill1 = diceResult1 + character1.velocidade
            totalTestSkill2 = diceResult2 + character2.velocidade

            //Chama função para mostrar o resultado do dado 
            await logRollResult(
                character1.nome,
                "velocidade",
                diceResult1,
                character1.velocidade
            )

            await logRollResult(
                character2.nome,
                "velocidade",
                diceResult2,
                character2.velocidade
            )
        }

        if(block == "CURVA"){
            totalTestSkill1 = diceResult1 + character1.manobrabilidade
            totalTestSkill2 = diceResult2 + character2.manobrabilidade

            await logRollResult(
                character1.nome,
                "manobrabilidade",
                diceResult1,
                character1.manobrabilidade
            )

            await logRollResult(
                character2.nome,
                "manobrabilidade",
                diceResult2,
                character2.manobrabilidade
            )
        }

        if(block == "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.poder    
            let powerResult2 = diceResult2 + character2.poder

            console.log(`${character1.nome} confrontou com ${character2.nome}!🥊`)

             await logRollResult(
                character1.nome,
                "poder",
                diceResult1,
                character1.poder,
            )

            await logRollResult(
                character2.nome,
                "poder",
                diceResult2,
                character2.poder,
            )

            let itens = Math.floor(Math.random() * 2)
            let attack = itens == 0 ? 1 : 2
            let item = itens == 0 ? "🐢" : "💣"

            //Condicionais para ver quem perde pontos
            if(powerResult1 > powerResult2 && character2.pontos > 0){
                console.log(`${character1.nome} venceu o confronto!`);
                console.log(`${character2.nome} perdeu ${attack} Ponto(s)${item}`)
               
                character2 -= attack
            }
            if(powerResult1 > powerResult2) console.log(`${character1.nome} ganhou 1 ponto 🍄`)


            if(powerResult2 > powerResult1 && character1.pontos > 0){
                console.log(`${character2.nome} venceu o confronto!`);
                console.log(`${character1.nome} perdeu ${attack} Ponto(s)${item}`)
                
                character1.pontos -= attack
            }
            if(powerResult2 > powerResult1) console.log(`${character2.nome} ganhou 1 ponto 🍄`)

            //Se empate
            if(powerResult1 === powerResult2)   console.log("Confronto Empatado! Nenhum ponto foi perdido!")
        }

        //Verificando vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.nome} marcou um ponto`)
            character1.pontos ++
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.nome} marcou um ponto`)
            character2.pontos ++
        }

        console.log("-------------------------")
    };
;}

//Função para declarar o Vencedor da Partida
async function declareWinner(character1, character2) {
    console.log("RESULTADO FINAL:\n")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)\n${character2.nome}: ${character2.pontos} ponto(s)\n`)
    
    //Amostra de dados corretamente
    if (character1.pontos < 0) character1.pontos = 0
    if (character2.pontos < 0) character2.pontos = 0

    if(character1.pontos > character2.pontos){
        console.log(`${character1.nome} venceu a corrida!🏆🏁`)
    }else if(character2.pontos > character1.pontos){
        console.log(`${character2.nome} venceu a corrida!🏆🏁`)
    }else
        console.log(`A corrida terminou empatada!`)
}


//Função Auto Invoke
(async function  main() {
    const [player1, player2] = await drawPlayers(players);
    console.log(
        `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando ... \n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1,player2)
})();