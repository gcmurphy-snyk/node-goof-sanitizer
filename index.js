const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const app = express()
const port = 3000
app.set('view engine', 'ejs')

db.serialize(() => {
db.run(`
    create table if not exists users (
        id integer primary key autoincrement,
        name text,
        email text,
        password text
    )`
);
db.run(`
    insert into users (name, email, password) values ( 
        "Joe Citizen", "joe@example.com", "hunter2"
    )
`);

db.run(`
    insert into users (name, email, password) values (
        "Jane Doe", "jane@example.com", "sekritz"
    );
`);
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/search', (req, res) => {
  var results = [];
  db.all(`select * from users where email = '${req.query.q}'`, (err, rows) => {
    if (err) {
        res.status(400);
        res.send("bad request");
    } else {
        console.log(rows);
        res.render('results', { results: rows});
    }
  })
})

app.listen(port, () => {
  console.log(`This application is vulnerable to SQLI! ${port}`)
})
