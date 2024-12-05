import express from 'express'
import sql from 'sqlite3'

const sqlite3 = sql.verbose()

// Create an in-memory database for testing
const db = new sqlite3.Database(':memory:')

// Create the table
db.run(`CREATE TABLE IF NOT EXISTS student1_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT NOT NULL)`)

const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  console.log('GET called')
  res.render('index')
})

// Start the web server
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})

//Student 1 stuff
app.get('/student1', function (req, res) {
  console.log('GET /comments called')
  const local = { comments: [] }
  db.all('SELECT id, comment FROM student1_table', function (err, rows) {
      if (err) {
          console.log(err)
      } else {
          local.comments = rows.map(row => ({
              id: row.id,
              comment: row.comment
          }))
          // Renders student ones main page
          res.render('student1', local)
      }
  })
})

//Student 1 get comments
app.get('/commentsS1', function(req, res) {
  console.log('GET /comments called')
  const local = { comments: [] }
  db.all('SELECT id, comment FROM student1_table', function (err, rows) {
      if (err) {
          console.log(err)
      } else {
          local.comments = rows.map(row => ({
              id: row.id,
              comment: row.comment
          }))
          // Render the comments page with the comments
          res.render('student1/commentsS1.pug', local)
      }
  })
})

//Student 1 new comment
app.post('/newCommentS1', function (req, res) {
    const commentInput = req.body.student1_table
    if (!commentInput || commentInput.trim() === '') {
        return res.redirect('/')
    }

    console.log('adding comment')
    const stmt = db.prepare('INSERT INTO student1_table (comment) VALUES (?)')
    stmt.run(req.body.student1_table)
    res.redirect('/commentsS1')
    stmt.finalize()
})

//Student 1 delete comment
app.post('/deleteS1', function (req, res) {
    console.log('deleting comment')
    const stmt = db.prepare('DELETE FROM student1_table WHERE id = ?')
    stmt.run(req.body.id)
    res.redirect('/commentsS1')
    stmt.finalize()
})







