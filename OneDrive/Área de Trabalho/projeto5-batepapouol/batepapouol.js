
let mensagens = [];
let nome = "";
let teste;

usuario();


function usuario() {

    nome = prompt("Qual seu lindo nome?")

    entrando();
    
    
}

function entrando() {
    
    let promiseNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: nome})
    console.log("foi");
    promiseNome.then(usuarioIn);
    
    
}

function usuarioIn () {
    
    pegarMensagens();
    testeConexao();
    setInterval(pegarMensagens, 3000)
}




function pegarMensagens() {
    
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    // console.log("enviou a mensagem!")
    promise.then(msg)
    

}


function msg(message) {
    // console.log("mensagem chegou!")
    // console.log(message)
    // console.log(message.data)

    mensagens = message.data

    renderizar();
}

function renderizar() {

    let finalizar = document.querySelector(".finalizar")

    finalizar.scrollIntoView({block: "end"})

    let texto = document.querySelector(".caixa-mensagens")


    texto.innerHTML = "";

    for (i = 0; i < mensagens.length; i++) {
        let escopo = mensagens[i]

        if (escopo.text === "entra na sala..." || escopo.text === "sai da sala...") {

            texto.innerHTML +=

                `<div class="linhas-normal"> <div class="texto mensagem-normal"> <p> (${escopo.time}) <strong> ${escopo.from}</strong> ${escopo.text}  </p> </div> </div>`

        }
        else if (escopo.to === "Todos") {
            texto.innerHTML += `      <div class="linhas-normal2"> <div class="texto mensagem-normal2 "> <p> (${escopo.time})  <strong>${escopo.from}</strong> para <strong> ${escopo.to}</strong> : ${escopo.text}  </p> </div> </div>`
        }
        else if (escopo.to !== "Todos") {
            texto.innerHTML += `      <div class="linhas-reservadamente"> <div class="texto reservadamente "> <p> (${escopo.time})  <strong>${escopo.from}</strong> reservadamente para <strong>${escopo.to}</strong> : ${escopo.text}  </p> </div> </div>`
        }
    }


}

function testeConexao() {

    const promiseConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: nome})

    promiseConexao.then();

    promiseConexao.catch(erro)

}

function erro () {
    alert("Usuario já existe, desiste desse nick")
}

setInterval(testeConexao, 5000)


function enviarMsg () {
    let promise2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {from: nome, to: teste.to, text: teste.text, type: teste.type})
    promise2.then(pegarMensagens)
    promise2.catch(erro)

}


function input () {
    let text = document.querySelector(".envio").value 
    console.log(text)
    let to = "Todos";
    let type = "message";
    
    teste = {from: nome, to:to, text:text, type:type}
    enviarMsg()
    criandofooter()
}

function criandofooter() {

    let footer = document.querySelector(".caixa-inferior")

    footer.innerHTML = `  <div class="caixa-inferior">
                
    <div> <input class="envio" type="text" name="text" placeholder="Escreva aqui..." /> </div>

    <div> <ion-icon name="paper-plane-outline" onclick="input(this)"> </ion-icon> </div>     

 </div>`
}








