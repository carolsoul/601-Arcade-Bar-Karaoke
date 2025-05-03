import { createConnection } from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // Aqui está a senha
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err)
        return
    }
    console.log('Conectado ao MySQL!')
})

export default connection