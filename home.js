window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {

        localStorage.removeItem("usuarioGuid");

        window.location.href = "telaLogin.html";
    }

    var icon = document.guerySelector(".icon");

    icon.onclick() = fucnction(e) {

        var menu = document.querySelector(".topnav");

        if (menu.className == "topnav") {
            menu.className += " open";
        }
        else {
            menu.className = "topnav";
        }

    }

    function obterUsuario(usuarioGuid) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    var mensagem = "Bem vindo ao sistema " + result.nome + "!";

                    documente.getElementById("spnMensagem").innerHTML = mensagem;
                }
                else {
                    window.location.href = "telalogin.html";
                }
            }
            else{

            }
        });

        xhr.open("GET", "https://localhost:44386/api/usuario/obterUsusario?usuarioGuid=" + usuarioGuid);

        xhr.send();

    }

}