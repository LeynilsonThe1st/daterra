const revelarMenu = (botao, nav) => {
    botao.classList.remove("transparente");
    botao.classList.add("vermelho");
    nav.classList.add("show-menu");
};
const ocultarMenu = (botato, nav) => {
    botato.classList.remove("vermelho");
    botato.classList.add("transparente");
    nav.classList.remove("show-menu");
};

const trocarCorMenu = (navMenu, remover, adicionar) => {
    navMenu.classList.remove(remover);
    navMenu.classList.add(...adicionar);
};

window.addEventListener("load", () => {
    let botaoMenu = document.querySelector("#botao-menu"),
        links = document.querySelectorAll(".menu-links a.link"),
        menu = document.querySelector(".menu");

    botaoMenu.addEventListener("click", () => {
        if (!menu.classList.contains("show-menu")) revelarMenu(botaoMenu, menu);
        else ocultarMenu(botaoMenu, menu);
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            if (menu.classList.contains("show-menu")) ocultarMenu(botaoMenu, menu);
        });
    });
});

window.addEventListener("scroll", () => {
    let nav = document.querySelector(".menu"),
        activador = document.querySelector(".activador"),
        header = document.querySelector("header"),
        servicos = document.querySelector("#servicos"),
        calculadora = document.querySelector("#calculadora"),
        menu = document.querySelector(".menu"),
        windowPos = window.scrollY,
        servicosTop = servicos.offsetTop - 75,
        calculadoraTop = calculadora.offsetTop - 75;

    if (
        windowPos >= activador.offsetTop - 75 &&
        !menu.classList.contains("show-menu")
    ) {
        nav.style.opacity = 0;
    } else {
        nav.style.opacity = 1;
    }
    if (windowPos >= header.offsetHeight - 75) {
        trocarCorMenu(nav, "branco", ["preto-fusco"]);
        nav.style.opacity = 1;

        if (windowPos >= calculadoraTop && windowPos < servicosTop) {
            trocarCorMenu(nav, "preto-fusco", ["primario-escuro", "texto-branco"]);
        } else {
            nav.classList.remove("primario-escuro", "texto-branco");
        }
        if (windowPos >= servicosTop) {
            trocarCorMenu(nav, "preto-fusco", ["bg-light"]);

        } else {
            nav.classList.remove("bg-light");
        }
    } else {
        trocarCorMenu(nav, "preto-fusco", ["branco"]);
    }
});
