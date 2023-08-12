const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let notes = [
  // ... (tus notas existentes aquí)
]

// Endpoint para obtener todas las notas
app.get('/api/notes', (req, res) => {
  if (req.query.important) {
    const isImportant = req.query.important === 'true';
    return res.json(notes.filter(note => note.important === isImportant));
  }
  res.json(notes);
});

// Endpoint para obtener una nota específica por ID
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(note => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// Endpoint para crear una nueva nota
app.post('/api/notes', (req, res) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
  const newNote = {
    id: maxId + 1,
    content: req.body.content,
    date: new Date().toISOString(),
    important: req.body.important || false
  };

  notes = notes.concat(newNote);
  res.json(newNote);
});

// Endpoint para borrar una nota
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
