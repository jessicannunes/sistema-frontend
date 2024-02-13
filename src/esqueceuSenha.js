window.onload = function (e) {
    var btnrecuperarsenha = document.getElementById("btnrecuperarSenha");
    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    btnrecuperarsenha.onclick = function () {
        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {
            exibirMensagemErro("Campo email não preenchido");
        }
        else {
            recuperarsenha(email);
            alert("Informações de recuperação de senha envidas para: " + email);
        }

    }

    function recuperarsenha(email) {

        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var esqueceusenhaResult = JSON.parse(this.responseText);

                if (esqueceusenhaResult.sucesso) {

                    alert("email enviado como sucesso");
                }
                else {
                    exibirMensagemErro(esqueceusenhaResult.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44386/api/usuario/esqueceusenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem){

        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";
        setTimeout(function() {
            spnErro.style.display = "none";
        }, 5000);
        return mensagem
    }


}