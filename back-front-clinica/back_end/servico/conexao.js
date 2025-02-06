import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "apimedico",
  password: "Suporte99",
  database: "clinica",
});

export default pool;
