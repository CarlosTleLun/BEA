const buscador = document.getElementById("buscador");
const items = document.querySelectorAll(".item");
const formBuscador = document.getElementById("formBuscador");

// Quitar acentos
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Distancia de Levenshtein simplificada
function distancia(a, b) {
    const matriz = [];
    for (let i = 0; i <= b.length; i++) matriz[i] = [i];
    for (let j = 0; j <= a.length; j++) matriz[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matriz[i][j] = matriz[i - 1][j - 1];
            } else {
                matriz[i][j] = Math.min(
                    matriz[i - 1][j - 1] + 1,
                    matriz[i][j - 1] + 1,
                    matriz[i - 1][j] + 1
                );
            }
        }
    }
    return matriz[b.length][a.length];
}

// 🔎 Solo buscar y hacer scroll
formBuscador.addEventListener("submit", function (e) {

    e.preventDefault();

    const texto = normalizar(buscador.value.trim());

    if (texto === "") return;

    for (let item of items) {

        const contenido = normalizar(
            item.textContent + " " + item.dataset.tags
        );

        if (contenido.includes(texto)) {

            item.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        // búsqueda aproximada
        const palabras = contenido.split(" ");
        for (let palabra of palabras) {
            if (distancia(texto, palabra) <= 2) {

                item.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                return;
            }
        }
    }

    alert("No se encontró contenido 😢");
});



document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

const destino = document.querySelector(this.getAttribute("href"));

const inicio = window.pageYOffset;
const fin = destino.offsetTop;
const distancia = fin - inicio;
const duracion = 900;

let inicioTiempo = null;

function animacionScroll(tiempo){

if(!inicioTiempo) inicioTiempo = tiempo;

const progreso = tiempo - inicioTiempo;
const porcentaje = Math.min(progreso / duracion, 1);

window.scrollTo(0, inicio + distancia * ease(porcentaje));

if(progreso < duracion){
requestAnimationFrame(animacionScroll);
}

}

function ease(t){
return t<0.5 ? 2*t*t : -1+(4-2*t)*t;
}

requestAnimationFrame(animacionScroll);

});

});
