import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

// Conecta ao banco
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Testa a conexão
db.query('SELECT 1 + 1 AS resultado', (err, rows) => {
  if (err) {
    console.error('Erro na query de teste:', err);
  } else {
    console.log('Query de teste bem-sucedida:', rows);
  }
});


export default db;
