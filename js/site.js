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
    setTimeout(() => {
        modal.classList.add("on");
    }, 200);
    // fecha o modal e o usuario clicar fora dele
    modal.addEventListener("click", e => {
        if (
            e.target.classList[0] == "modal-layer" ||
            e.target.parentNode.classList[0] == "modal-layer"
        ) {
            ocultarModal(modal);
        }
    });
};
const ocultarModal = modal => {
    modal.classList.remove("on");
    setTimeout(() => {
        modal.style.display = "none";
    }, 200);
};

const addLoader = (el = "#pacotes", txt = "os pacotes") => {
    if (!document.querySelector("#Ploader")) {
        var preloaderHTML = `
            <div id="Ploader">
                <span class="texto-forte mr-15">A carregar ${txt}</span>
                <img src="/img/loader.svg" class="svg spin" alt="loader">
            </div>`;
        document.querySelector(el).innerHTML += preloaderHTML;
    }
};
const removeLoader = () => {
    var preloader = document.querySelector("#Ploader");
    if (preloader) {
        preloader.remove();
    }
};
const servicosHandler = (response, pacotes) => {
    let options = [];
    for (let pacote of response.pacotes) {
        let option = `<option value="${options.length + 1}">${pacote}</option>`;
        options.push(option);
        pacotes.innerHTML += option;
    }
    removeLoader();
    pacotes.style.display = "block";
};

const solicitacaoHandler = resposta => {
    let msg = resposta.msg;
    document.querySelector("#msg").innerHTML = `
    <p class="texto-forte grande texto-verde pv-20">${msg}</p>
    `;
    removeLoader();
};

// executa o codigo abaixo apenas quando o DOM carregar
// Sem esperar pelo css e imagens
window.addEventListener("load", () => {
    let botaoMenu = document.querySelector("#botao-menu"), // botão para abrir e fechar
        links = document.querySelectorAll(".menu-links a.link"), // array com os links no menu
        modal = document.querySelector("#modal"), // O modal
        modalServico = document.querySelector("#modal-servico"), // O modal
        botaoFecharModal = document.querySelectorAll(".fechar-modal"), // botao para fechar o modal
        botaoCalcular = document.querySelector("#calcular"),
        botaoVerServicos = document.querySelector("#ver-servicos"),
        botaoSolicitarServico = document.querySelectorAll(".solicitar-servico"),
        botaoSolicitar = document.querySelector("#solicitar"),
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
    });

    botaoFecharModal.forEach(btnFechar => {
        btnFechar.addEventListener("click", e => {
            if (e.target.type == "reset") ocultarModal(modalServico);
            else ocultarModal(modal);
        });
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
    });

    botaoSolicitarServico.forEach(btnServico => {
        btnServico.addEventListener("click", e => {
            e.preventDefault();
            addLoader();

            let cartaoDoservico =
                    e.target.parentNode.parentNode.parentNode.parentNode,
                imgDoServico = cartaoDoservico.querySelector("img"),
                tituloDoservico = cartaoDoservico.querySelector("h3"),
                modalImg = document.querySelector("#servico-img"),
                modalTitulo = document.querySelector("#servico-nome"),
                modalPacotes = document.querySelector("#pacote");

            modalImg.src = imgDoServico.src;
            modalTitulo.innerText = tituloDoservico.innerText;
            let codServiso = e.target.previousElementSibling.value;
            modalPacotes.previousElementSibling.value = codServiso;
            var len = modalPacotes.length;
            while (len > 1) {
                modalPacotes.children.item(len - 1).remove();
                len--;
            }
            modalPacotes.style.display = "none";
            document.querySelector("#msg").innerHTML = " ";
            revelarModal(modalServico);

            ajaxRequest(e.target.form, response => {
                servicosHandler(response.target.response, modalPacotes);
            });
        });
    });

    botaoSolicitar.addEventListener("click", e => {
        e.preventDefault();
        addLoader("#msg", "o seu pedido")
        ajaxRequest(e.target.form, response => {
            solicitacaoHandler(response.target.response);
        });
    });
});
window.addEventListener("scroll", () => {
    let nav = document.querySelector(".menu"),
        activador = document.querySelector(".activador"),
        header = document.querySelector("header"),
        servicos = document.querySelector("#servicos"),
        calculadora = document.querySelector("#calculadora"),
        comentarios = document.querySelector("#sec-comentarios"),
        windowPos = window.scrollY,
        servicosTop = servicos.offsetTop - 75,
        calculadoraTop = calculadora.offsetTop - 75,
        comentariosTop = comentarios.offsetTop - 75;

    if (
        windowPos >= activador.offsetTop - 75 &&
        !nav.classList.contains("show-menu")
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

        if (windowPos >= comentariosTop) {
            trocarCorMenu(nav, "bg-light", ["branco"]);
        } else {
            nav.classList.remove("branco");
        }
    } else {
        trocarCorMenu(nav, "preto-fusco", ["branco"]);
    }
});
