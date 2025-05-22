   
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();


const PORT = 8000;


app.use(express.json()); 


// Função para registrar log
function registrarLog(nome) {
  const id = uuidv4();
  const dataHora = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const mensagem = `${id} - ${dataHora} - ${nome}\n`;


  fs.appendFileSync('logs.txt', mensagem);
  return { id, mensagem };
}


// Rota POST para adicionar log
app.post('/logs', (req, res) => {
  const { nome } = req.body;


  if (!nome) {
    return res.status(400).json({ erro: 'O nome do aluno é obrigatório.' });
  }


  const resultado = registrarLog(nome);
  res.status(201).json({ mensagem: 'Log registrado com sucesso!', id: resultado.id });
});


// Rota GET para consultar log por ID
app.get('/logs/:id', (req, res) => {
  const { id } = req.params;


  try {
    const logs = fs.readFileSync('logs.txt', 'utf8').split('\n');
    const linhaEncontrada = logs.find(linha => linha.startsWith(id));


    if (linhaEncontrada) {
      res.status(200).json({ log: linhaEncontrada });
    } else {
      res.status(404).json({ erro: 'Log não encontrado' });
    }
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao ler o arquivo de logs.' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
 




