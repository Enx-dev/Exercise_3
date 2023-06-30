const express = require("express");
const app = express();

const persons = [
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

const number_of_persons = persons.length;
const today = new Date();
// get todays date
app.use("/api/persons", (req, res) => {
  res.json(persons);
});

app.use("/info", (req, res) => {
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
