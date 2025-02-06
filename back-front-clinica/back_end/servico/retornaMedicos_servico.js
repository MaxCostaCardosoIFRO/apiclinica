import pool from "./conexao.js";

////////////////////////////////////////////////////////////
async function executarQuery(conexao, query) {
  const [resultado] = await conexao.query(query);
  return resultado;
}

////////////////////////////////////////////////////////////
async function listarTodosMedicos() {
  const conexao = await pool.getConnection();
  const query = `
    SELECT m.id, m.nome, m.telefone, m.email, e.especialidade 
    FROM medicos m 
    JOIN especialidades e ON m.especialidade = e.id 
    ORDER BY m.nome ASC`;
  const medicos = await executarQuery(conexao, query);
  conexao.release();

  if (medicos.length === 0) {
    throw new Error("Nenhum médico encontrado no banco de dados.");
  }
  return medicos;
}

////////////////////////////////////////////////////////////
async function filtrarMedicosPorNome(nome) {
  const todosMedicos = await listarTodosMedicos();
  const medicosFiltrados = todosMedicos.filter((medico) =>
    medico.nome.toLowerCase().includes(nome.toLowerCase())
  );

  if (medicosFiltrados.length === 0) {
    throw new Error(`Nenhum médico encontrado com o nome: ${nome}`);
  }
  return medicosFiltrados;
}

////////////////////////////////////////////////////////////
async function filtrarMedicosPorEspecialidade(especialidade) {
  const conexao = await pool.getConnection();
  const query = `
    SELECT m.id, m.nome, m.telefone, m.email, e.especialidade 
    FROM medicos m 
    JOIN especialidades e ON m.especialidade = e.id 
    WHERE e.especialidade = "${especialidade}"`;
  const medicosFiltrados = await executarQuery(conexao, query);
  conexao.release();

  if (medicosFiltrados.length === 0) {
    throw new Error(
      `Nenhum médico encontrado com a especialidade: ${especialidade}`
    );
  }
  return medicosFiltrados;
}

export {
  listarTodosMedicos,
  filtrarMedicosPorNome,
  filtrarMedicosPorEspecialidade,
};
