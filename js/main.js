// ANIMACIONES AL SCROLL
const elements = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

elements.forEach(el => observer.observe(el));

//menu movil
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
});

// Cerrar menú al hacer click en enlace
document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
    });
});

//Seccion de modales INFO
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalBody = document.getElementById("modal-body");
const cerrar = document.querySelector(".cerrar");

const contenido = {

    cientifica: {
        titulo: "Científica del Mes",
        html: `
        <img src="img/personajes/perfil.png" atl="Cientifica" class="img-cientifica">
            <h2>Kalpana Chawla</h2>
            <p>Aquí va la info</p>
        `
    },

    quimica: {
        titulo: "Canales de Química",
        html: `
            <a href="https://www.youtube.com/channel/UCJQaEsxaB0jCzbtLxuGqd6Q" target="_blank">✦ Quimiayudas</a>
            <a href="https://www.youtube.com/@laquimicadeyamil" target="_blank">✦ La Química de Yamil</a>
            <a href="https://www.youtube.com/@QuimitubeTulibrodeQu%C3%ADmica" target="_blank">✦ Quimitube Tu libro de Química</a>
            <a href="https://www.youtube.com/@AmigosdelaQu%C3%ADmica" target="_blank">✦ Amigos de la Química</a>
            <a href="https://www.youtube.com/@valdiviezomendozazabdielur4580" target="_blank">✦ Valdiviezo Mendoza Zabdiel Urias</a>
        `
    },

    matematicas: {
        titulo: "Canales de Matemáticas",
        html: `
            <a href="#">JulioProfe</a>
            <a href="#">Math2me</a>
        `
    },

    biologia: {
        titulo: "Canales de Biología",
        html: `
            <a href="#">La Hiperactina</a>
            <a href="#">Biología desde Cero</a>
        `
    }

};

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const tema = card.dataset.tema;
        modalTitulo.textContent = contenido[tema].titulo;
        modalBody.innerHTML = contenido[tema].html;
        modal.classList.add("active");
    });
});

cerrar.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
