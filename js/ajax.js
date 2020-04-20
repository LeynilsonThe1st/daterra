const addPreloader = () => {
    console.log("A carregar ...");
    if (!document.querySelector("#preloader")) {
        var preloaderHTML = `
            <div id="preloader">
                <span class="texto-forte mr-15">Aguarde Por Favor</span>
                <img src="/img/loader.svg" class="svg spin" alt="loader">
            </div>`;
        document.querySelector("#resultado").innerHTML = preloaderHTML;
    }
};
const removePreloader = () => {
    console.log("Carregamento completo");
    var preloader = document.querySelector("#preloader");
    if (preloader) {
        preloader.remove();
    }
};
const sucesso = response => {
    console.log(response);
    // document.querySelector("#resultado").innerHTML = response.texto;
};
const ajaxRequest = (oFormElement, callback = null) => {
    if (!oFormElement.action) {
        return;
    }
    var oReq = new XMLHttpRequest();
    if (typeof callback == "function") {
        oReq.onload = callback;
    } else {
        oReq.onreadystatechange = () => {
            if (oReq.readyState == 4 && oReq.status == 200) {
                sucesso(oReq.response);
                removePreloader();
            } else if (oReq.readyState == 4 && oReq.status == 304) {
                removePreloader();
            } else {
                addPreloader();
            }
        };
    }
    if (oFormElement.method.toLowerCase() === "post") {
        oReq.open("post", oFormElement.action);
        oReq.responseType = "json";
        oReq.send(new FormData(oFormElement));
    } else {
        var oField,
            sFieldType,
            nFile,
            sSearch = "";
        for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
            oField = oFormElement.elements[nItem];
            if (!oField.hasAttribute("name")) {
                continue;
            }
            sFieldType =
                oField.nodeName.toUpperCase() === "INPUT"
                    ? oField.getAttribute("type").toUpperCase()
                    : "TEXT";
            if (sFieldType === "FILE") {
                for (
                    nFile = 0;
                    nFile < oField.files.length;
                    sSearch +=
                        "&" +
                        escape(oField.name) +
                        "=" +
                        escape(oField.files[nFile++].name)
                );
            } else if (
                (sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") ||
                oField.checked
            ) {
                sSearch +=
                    "&" + escape(oField.name) + "=" + escape(oField.value);
            }
        }
        oReq.open(
            "get",
            oFormElement.action.replace(
                /(?:\?.*)?$/,
                sSearch.replace(/^&/, "?")
            ),
            true
        );
        oReq.responseType = "json";
        oReq.send(null);
    }
};
