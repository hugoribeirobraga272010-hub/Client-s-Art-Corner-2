app.post("/cadastro", (req, res) => {
 
    const { nome, email, senha } = req.body;
 
    db.query(
        "INSERT INTO usuario(nome,email,senha) VALUES(?,?,?)",
        [nome, email, senha],
        (erro) => {
 
            if (erro)
                return res.status(500).json(erro);
 
            res.json({
                mensagem: "Usuário cadastrado!"
            });
 
        }
    );
 
});
 
app.post("/login", (req, res) => {
 
    const { email, senha } = req.body;
 
    db.query(
        "SELECT id_usuario AS id, nome, email FROM usuario WHERE email=? AND senha=?",
        [email, senha],
        (erro, resultado) => {
 
            if (erro)
                return res.status(500).json(erro);
 
            if (resultado.length == 0)
                return res.status(401).json({
                    erro: "Login inválido"
                });
 
            res.json(resultado[0]);
 
        }
    );
 
});
 

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});