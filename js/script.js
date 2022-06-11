let imagem = document.getElementById("imagem");
let titulo = document.getElementById("titulo");
let descricao = document.getElementById("descricao");
let areaCards = document.getElementById("areaCards");
let button = document.getElementById("submit");
let idCard = 1;

descricao.onkeyup = contar =>{
    document.getElementById("contador").innerText = descricao.value.length;
}


function newCard(event) {
    event.preventDefault();
    descricao.value.length > 0 ? criarCard() : document.getElementById("alerta").innerText ="*Obrigatório";
};

function criarCard() {
    isValidHttpUrl(imagem.value);
    !titulo.value && titulo.value.length === 0 ? titulo.value  = "Sem Titulo" : titulo.value;
    !imagem.value && imagem.value.length === 0 ? imagem.value  = "./img/SemImagem.png" : imagem.value;
    
    let card = 
    `<div class="col" id="cardTask${idCard}">
        <div class="card shadow p-3 bg-body">
            <button id="delCard${idCard}" class="btn btn-outline-danger btn-sm position-absolute top-0 start-100 translate-middle rounded-25" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Excluir Task"><small><i class="bi bi-x-lg"></i></small></button>
            <img src="${imagem.value}" class="card-img-top" alt="Imagem" style="filter:none">
            <div class="card-body">
                <h5 class="card-title"><strong>${titulo.value}</strong></h5>
                <p class="card-text">${descricao.value}</p>
            </div>
            <button id="conluirCard${idCard}" class="btn btn-outline-link btn-sm position-absolute bottom-0 end-0 rounded-25" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cocluir Task"><i class="bi bi-hand-thumbs-up"></i></button>
        </div>
    </div>`
    areaCards.innerHTML += card;
    
    document.getElementById("delCard"+idCard).setAttribute("onclick","delCard("+idCard+")");
    document.getElementById("conluirCard"+idCard).setAttribute("onclick","conluirCard("+idCard+")");
    titulo.value = null;
    descricao.value = null;
    imagem.value = null;
    document.getElementById("alerta").innerText = null;
    document.getElementById("contador").innerText = 0;
    idCard++
};



function delCard(id){
    document.getElementById('cardTask'+id).outerHTML = '';
}

function conluirCard(id){
    let btn =  document.getElementById('conluirCard'+id);
    btn.classList.toggle(`text-success`)
    btn.innerHTML == '<i class="bi bi-hand-thumbs-up-fill"></i>' ? btn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>' : btn.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i>';
    let card = document.getElementById('cardTask'+id);
    card.firstElementChild.classList.toggle('text-black-50');
    card.firstElementChild.classList.toggle('text-decoration-line-through');
    let imgCard = card.querySelector("img")
    imgCard.style.filter = imgCard.style.filter == 'none'? "grayscale(100%)": 'none' ;
}


//Verificar se a URL informada é de uma imagem e se não for executa a função para setar a imgem padrão
function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        imagem.addEventListener("error",  setImg());
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function setImg(){
    imagem.value  = "./img/SemImagem.png"
}

//Ativar o tooltip do bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})