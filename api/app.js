import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import musicasRoutes from './routes/musicas.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/musicas', musicasRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})