import * as server from 'server.js'

db = server.db;
app = server.app;

//create table if does not already exist
db.run(`CREATE TABLE IF NOT EXISTS zombTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT NOT NULL)`)

//create JSON of comment rows
app.get('/student2/', function (req, res) {
    //TODO You will need to do a SQL select here
    //TODO You will need to update the code below!
    const local = { comments: [] }
    db.each('SELECT id, comment FROM zombTable', function (err, row) {
        if (err) {
        console.log(err)
        } else {
        local.tasks.push({ id: row.id, comment: row.comment })
        }
    }, function (err, numrows) {
        if (!err) {
        res.render('index', local)
        } else {
        console.log(err)
        }
    })
    console.log(comments);
})

//SQL Insert of Comment
app.post('/student2/', function (req, res) {
    const stmt = db.prepare('INSERT INTO zombTable (comment) VALUES (@0)')
    stmt.run(req.body.comment-box)
    stmt.finalize()
})

//SQL Delete of Comment
app.post('/student2/delete', function (req, res) {
    const stmt = db.prepare('DELETE FROM zombTable where id = (@0)')
    stmt.run(req.body.comment-box)
    stmt.finalize()
})

//SQL Delete of Comment
app.post('/student2/edit', function (req, res) {
    let c = prompt("What do you want to change it to?")
    const stmt = db.prepare('UPDATE SET comment = c FROM zombTable where id = (@0)')
    stmt.run(req.body.comment-box)
    stmt.finalize()
})