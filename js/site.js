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
const revelarModal = modal => {
    modal.style.display = "flex";
    setTimeout( () => {
        modal.classList.add("on");
    }, 200);
};
const ocultarModal = modal => {
    modal.classList.remove("on");
    setTimeout( () => {
        modal.style.display = "none";
    }, 200);
};

// executa o codigo abaixo apenas quando o DOM carregar
// Sem esperar pelo css e imagens
window.addEventListener("load", () => {
    let botaoMenu = document.querySelector("#botao-menu"), // botão para abrir e fechar
        links = document.querySelectorAll(".menu-links a.link"), // array com os links no menu
        modal = document.querySelector("#modal"), // O modal
        botaoFecharModal = document.querySelector("#fechar-modal"), // botao para fechar o modal
        botaoCalcular = document.querySelector("#calcular"),
        botaoVerServicos = document.querySelector("#ver-servicos"),
        menu = document.querySelector(".menu");

    // Revela e oculta os links do menu
    botaoMenu.addEventListener("click", () => {
        if (!menu.classList.contains("show-menu")) revelarMenu(botaoMenu, menu);
        else ocultarMenu(botaoMenu, menu);
    });

    // Fecha o menu se algum link dentro nele for clicado
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (menu.classList.contains("show-menu"))
                ocultarMenu(botaoMenu, menu);
        });
    });

    // Revela o modal se o usuario clicar no botao "#calcular"
    botaoCalcular.addEventListener("click", e => {
        e.preventDefault(); // Previne o envio do formulário
        revelarModal(modal);

        let form = document.querySelector("#calc"); // Formulario calcular
        ajaxRequest(form); // Faz o request para o servidor usando Ajax

        // fecha o modal se o usuario clicar no "#fechar-modal"
        botaoFecharModal.addEventListener("click", () => ocultarModal(modal));
    });

    // fecha o modal e o usuario clicar fora dele
    modal.addEventListener("click", e => {
        if (e.target.id == "modal" || e.target.parentNode.id == "modal")
            ocultarModal(modal);
    });

    botaoVerServicos.addEventListener("click", () => {
        let srvcs = document.querySelector(".srvcs");
        let loader = document.querySelector("#loader");
        loader.style.minHeight = srvcs.scrollHeight + "px";
        srvcs.style.display = "none";
        loader.style.display = "flex";
        setTimeout(() => {
            srvcs.style.display = "grid";
            loader.style.display = "none";
        }, 5000);
        // console.log(hs);
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
            trocarCorMenu(nav, "preto-fusco", [
                "primario-escuro",
                "texto-branco"
            ]);
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
