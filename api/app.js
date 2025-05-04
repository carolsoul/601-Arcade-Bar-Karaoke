import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import musicasRoutes from './routes/musicas.js'

const app = express()
const PORT = process.env.PORT || 3000

// Utilitários para caminho absoluto
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middlewares
app.use(cors())
app.use(bodyParser.json())

// Rota da API
app.use('/musicas', musicasRoutes)

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')))

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
