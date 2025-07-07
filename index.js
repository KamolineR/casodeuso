const express = require("express");
const jwt = require("jsonwebtoken");
const app =  express();
app.use(express.json());

const SECRET =""
const PORT = 8080;
//Autenticação TOKEN

const usuario = []
const gastos = []

function gerarToken(usuario){
    return jwt.sign({id: usuario.id, email: usuario.email}, SECRET, {
        expiresIn: "1h"
    })
}

function autenticarToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(403)

    jwt.verify(token, SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// Pesquisa: como funciona a estrutura de um token jwt; Header(cabeçalho), paylead(corpo do token), signature(assinatura) //

let users = [];
let presenca = [];

//CADASTRO DO ALUNO , PARA O DIA 04/07/2025

app.post('/presenca', autenticarToken, (req, res)=>{
    const horaAgora = new Date()
    const limite = new Date()
    limite.setHours(7, 10, 0) //Horas, Minuto, Segundo


    //condicao ? valor_se_verdade
    const status = horaAgora > limite ? 'Atrasado' : 'Presente';

    presenca.push({
        email: req.user.email, 
        nome: URLSearchParams.find(u => u.email === req.user.email)?.nome || '',
        hora: horaAgora.toLocaleTimeString('pt-BR'),
        data: horaAgora.toLocaleDateString('pt-BR'),
        status
    });
    res.status(201).json({mensagem: `Presença registrada com ${status}`});
})

app.get('/presencas', autenticarToken, (req, res)=>{
    const Aluno = presencas.filter(p => p.email === req.user.email);
    res.json(Aluno);
})

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http//localhost:${PORT}`)
})