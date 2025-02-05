import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "apimedico",
  password: "Suporte99",
  database: "API_Clinica",
});

export default pool;
