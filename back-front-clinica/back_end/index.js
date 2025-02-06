import express from "express";
import {
  listarTodosMedicos,
  filtrarMedicosPorNome,
  filtrarMedicosPorEspecialidade,
} from "./servico/retornaMedicos_servico.js";
import pool from "./servico/conexao.js";

const app = express();

////////////////////////////////////////////////////////////

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  next();
});

////////////////////////////////////////////////////////////

app.get("/medicos", async (req, res) => {
  const { nome, especialidade } = req.query;
  let resultado;

  try {
    if (!nome && !especialidade) {
      resultado = await listarTodosMedicos();
    } else if (nome) {
      resultado = await filtrarMedicosPorNome(nome);
    } else if (especialidade) {
      resultado = await filtrarMedicosPorEspecialidade(especialidade);
    }

    res.json(resultado);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
});

//////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

////////////////////////////////////////////////////////////
app.listen(3000, async () => {
  const data = new Date();
  console.log("Servidor iniciado em" + data);

  ////////////////////////////////////////////////////////////
  const conexao = await pool.getConnection();
  console.log(
    "Conexão com o banco de dados estabelecida. Thread ID:",
    conexao.threadId
  );
  conexao.release();
});
