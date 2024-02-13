window.onload = function (e) {
    var btncadastro = document.getElementById("btncadastro");
    var txtNome = document.getElementById("txtNome");
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("txtEmail");
    var txtTelefone = document.getElementById("txtTelefone");
    var slcGenero = document.getElementById("slcGenero");
    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btncadastro.onclick = function(){        
        e.preventDefault();

        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var email = txtEmail.value;
        var telefone = txtTelefone.value;
        var senha = txtSenha.value;

        if (nome == "") {
            exibirmensagemErro("Informe o nome");
        }
        else if (sobrenome == "") {
            exibirmensagemErro("Informe o sobrenome");
        }
        else if (email == "") {
            exibirmensagemErro("Informe o email");
        }
        else if (telefone == "") {
            exibirmensagemErro("Informe o telefone");
        }
        else if (senha == "") {
            exibirmensagemErro("Informe a senha");
        }
        else {
            realizarCadastro(nome, sobrenome, email, telefone, genero, senha);
        }
    };

    function exibirmensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";
        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);

        return mensagem
    }

    function realizarCadastro(nome, sobrenome, email, telefone, genero, senha) {

        var data = JSON.stringify({

            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "genero": genero,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = "home.html";
                    
                }
                else {
                    exibirmensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44386/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}