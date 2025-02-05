import pool from "./conexao.js";

async function executarQuery(conexao, query) {
  let resposta_clinica = await conexao.query(query);
  let resposta = resposta_clinica[0];
  return resposta;
}

async function apresentartudo() {
  const conexao = await pool.getConnection();
  const query = `SELECT m.id, m.nome, m.telefone, m.email, e.especialidade FROM medicos m JOIN especialidades e ON m.especialidade = e.id ORDER BY m.nome ASC`;
  let resposta_medicos = await conexao.query(query);
  let resposta = resposta_medicos[0];
  conexao.release();
  return resposta;
}

async function apresentarMedicoNome(nomeMedico) {
  const listaNomes = await apresentartudo();
  const resposta = listaNomes.filter((medico) =>
    medico.nome.toLowerCase().includes(nomeMedico.toLowerCase())
  );
  return resposta;
}

async function apresentarMedicoEspecialidade(especialidade) {
  const conexao = await pool.getConnection();
  const query = `SELECT m.id, m.nome, m.telefone, m.email, e.especialidade FROM medicos m JOIN especialidades e ON m.especialidade = e.id WHERE e.especialidade = "${especialidade}"`;
  let resposta = executarQuery(conexao, query);
  conexao.release();
  return resposta;
}

export { apresentartudo, apresentarMedicoNome, apresentarMedicoEspecialidade };
