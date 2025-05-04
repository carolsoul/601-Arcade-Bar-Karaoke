import express from 'express';
import db from '../db.js';

const router = express.Router();

// Rota GET - Buscar músicas com filtros
router.get('/', (req, res) => {
  const { termo, artista, idioma, titulo } = req.query;

  let sql = 'SELECT * FROM musicas WHERE 1=1';
  const params = [];

  if (termo) {
    sql += ' AND (titulo LIKE ? OR interprete LIKE ?)';
    params.push(`%${termo}%`, `%${termo}%`);
  }

  if (artista) {
    const artistaDecodificado = decodeURIComponent(artista).trim();
    sql += ' AND interprete LIKE ?';
    params.push(`%${artistaDecodificado}%`);
  }

  if (idioma) {
    sql += ' AND idioma LIKE ?';
    params.push(`%${idioma}%`);
  }

  if (titulo) {
    sql += ' AND titulo LIKE ?';
    params.push(`${titulo}%`);
  }

  // Log para debugar a query
  console.log("SQL Query:", sql);
  console.log("Params:", params);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erro detalhado ao buscar músicas:', err);
      return res.status(500).send('Erro ao buscar músicas');
    }

    // Log dos resultados para ver se os dados estão sendo retornados corretamente
    console.log("Resultados da consulta:", results);

    if (results.length === 0) {
      return res.status(404).send('Nenhuma música encontrada');
    }

    // Retornando os resultados
    res.json(results);
  });
});

// Rota GET - Listar artistas únicos
router.get('/artistas', (req, res) => {
  db.query('SELECT DISTINCT interprete FROM musicas ORDER BY interprete ASC', (err, results) => {
    if (err) return res.status(500).send('Erro ao buscar artistas');
    const artistas = results.map(r => r.interprete);
    res.json(artistas);
  });
});

// Rota GET - Listar idiomas únicos
router.get('/idiomas', (req, res) => {
  db.query('SELECT DISTINCT idioma FROM musicas ORDER BY idioma ASC', (err, results) => {
    if (err) return res.status(500).send('Erro ao buscar idiomas');
    const idiomas = results.map(r => r.idioma);
    res.json(idiomas);
  });
});

// Rota POST - Adicionar nova música
router.post('/', (req, res) => {
  const { interprete, codigo, titulo, inicio_da_letra, idioma } = req.body;

  if (!interprete || !codigo || !titulo || !idioma) {
    return res.status(400).send('Campos obrigatórios não preenchidos.');
  }

  const sql = 'INSERT INTO musicas (interprete, codigo, titulo, inicio_da_letra, idioma) VALUES (?, ?, ?, ?, ?)';
  const params = [interprete, codigo, titulo, inicio_da_letra || '', idioma];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erro ao adicionar música:', err);
      res.status(500).send('Erro ao adicionar música');
      return;
    }
    res.status(201).send('Música adicionada com sucesso!');
  });
});

export default router;
