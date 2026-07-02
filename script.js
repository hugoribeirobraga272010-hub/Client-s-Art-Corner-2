const API = "http://localhost:3000";

const formLogin = document.getElementById("form_login");

const formCadastro = document.getElementById("form_cadastro");
 
if (formCadastro) {
    formCadastro.addEventListener("submit", async (event) => {
        event.preventDefault();
        const user = document.getElementById("nome-cadastro").value;
        const email = document.getElementById("email-cadastro").value;
        const password = document.getElementById("senha-cadastro").value;
        const resposta = await fetch(`${API}/cadastro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user,
                email,
                password
            })
        });
    });
};
     
 
if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("senha-login").value;
        const resposta = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
 
        const usuario = await resposta.json();
        if (resposta.ok) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "perfil.html";
        } else {
            alert(usuario.erro);
        }
    })};

    function carregarPerfil() {
 
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;
    if (document.getElementById("nome"))
        document.getElementById("nome").textContent = usuario.nome;
    if (document.getElementById("historico"))
        document.getElementById("historico").textContent = usuario.historico;
}