const express = require("express")
const app = express()

app.use(express.json())

let notes = [
  // ... (tus notas existentes aquí)
  {
    id: 1,
    content: "HTML es fácil",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Los navegadores solo pueden ejecutar Javascript, HTML y CSS",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET y POST son los tipos más importantes de HTTP",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
]

// Endpoint para obtener todas las notas
app.get("/api/notes", (req, res) => {
  if (req.query.important) {
    const isImportant = req.query.important === "true"
    return res.json(notes.filter((note) => note.important === isImportant))
  }
  res.json(notes)
})

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("¡Algo salió mal!")
})

// ... (parte anterior del código)

// Endpoint para obtener una nota específica por ID
app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: "Nota no encontrada" })
  }
})

// Endpoint para crear una nueva nota
app.post("/api/notes", (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ error: "El contenido es necesario" })
  }

  const newNote = {
    id: maxId + 1,
    content: req.body.content,
    date: new Date().toISOString(),
    important: req.body.important || false,
  }

  notes = notes.concat(newNote)
  res.json(newNote)
})

// Endpoint para borrar una nota
app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
