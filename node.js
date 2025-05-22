const express =  require('express');
const fs = require('fs');
const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');
const app = express();

const PORTA = 8000;

//função para registrar
function registrarLog(nome) {
    const id = uuidv4();
    const dataHora = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const mensagem = `${id} - ${dataHora} - ${nome}\n`;
   
    fs.appendFileSync('logs.txt', mensagem);
    return { id, mensagem };
}  
  
//adcionar log
app.post('/logs', (req, res) => {
    const { nome } = req.body;
  
}  

