const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const number_of_persons = persons.length;
const today = new Date();
// get todays date
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) return res.json(person);
  res.status(201).json("not found").end();
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/person", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  if (!body.name) {
    res.status(400).json({
      error: "name field missing",
    });
  }
  if (!body.number) {
    res.status(400).json({
      error: "number field missing",
    });
  }

  persons.map((person) => {
    if (person.name === body.name) {
      res.status(401).json({
        error: "name already exists",
      });
      res.end();
    }
  });

  const person = {
    name: body.name,
    number: body.number,
    important: body.important || false,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.post("/info", (req, res) => {
  res.send(`<div>
    <p>Phonebook has info for ${number_of_persons} persons</p>
    <p>${today}</p>
    </div>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is Up and running");
});
