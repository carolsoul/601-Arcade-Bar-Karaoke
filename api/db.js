import { createConnection } from 'mysql2'

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '11Ajl2005!',
    database: 'karaoke',
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err)
        return
    }
    console.log('Conectado ao MySQL!')
})

export default connection