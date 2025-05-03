import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import musicasRoutes from './routes/musicas.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Servir os arquivos do front-end (index.html, etc.)
app.use(express.static(path.join(__dirname, '../frontend')))

// Redirecionar para o index.html se for SPA (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/musicas', musicasRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})