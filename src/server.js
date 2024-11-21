// import express from 'express'
// import sql from 'sqlite3'

// const sqlite3 = sql.verbose()

// // Create an in memory table to use
// const db = new sqlite3.Database(':memory:')

// // // Create the table
// // db.run(`CREATE TABLE todo (
// //   id INTEGER PRIMARY KEY AUTOINCREMENT,
// //   comment TEXT NOT NULL)`)

// const app = express()
// app.use(express.static('public'))
// app.set('views', 'views')
// app.set('view engine', 'pug')
// app.use(express.urlencoded({ extended: false }))

// app.get('/', function (req, res) {
//   console.log('GET called')
//   res.render('index')
// })

// app.get('/student1', function (req, res) {
//   // console.log('GET called')
//   // const local = { comments: [] }
//   // db.all('SELECT id, comment FROM todo', function (err, rows) {
//   //     if (err) {
//   //         console.log(err)
//   //     }
//   //     else{
//   //     local.comments = rows.map(row => ({
//   //         id: row.id,
//   //         comment: row.comment
//   //     }))
      
//   //     res.render('index', local)

//   //     }})
// })

// app.get('/student2', function (req, res) {
//   console.log('GET called')
//   res.render('student2')
// })

// app.get('/student3', function (req, res) {
//   console.log('GET called')
//   res.render('student3')
// })

// app.post('/student1', function (req, res) {
// //   const commentInput = req.body.todo;
// //   if (!commentInput || commentInput.trim() === '') {
// //       return res.redirect('/');
// //   }

// //   console.log('adding todo item')
// //   const stmt = db.prepare('INSERT INTO todo (comment) VALUES (?)')
// //   stmt.run(req.body.todo)
// //   res.redirect('/')
// //   stmt.finalize()
// // })

// // app.post('/student1/delete', function (req, res) {
// //   console.log('deleting todo item')
// //   const stmt = db.prepare('DELETE FROM todo WHERE id = ?')
// //   stmt.run(req.body.id) 
// //   res.redirect('/')
// //   stmt.finalize()
// })

// // Start the web server
// app.listen(3000, function () {
//   console.log('Listening on port 3000...')
// })
import express from 'express'
import sql from 'sqlite3'

const sqlite3 = sql.verbose()

// Create an in memory table to use
const db = new sqlite3.Database(':memory:')

const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  console.log('GET called')
  res.render('index')
})

app.get('/student1', function (req, res) {
  console.log('GET called')
  res.render('student1')
})

app.get('/student2', function (req, res) {
  console.log('GET called')
  res.render('student2')
})

app.get('/student3', function (req, res) {
  console.log('GET called')
  res.render('student3')
})

// Start the web server
app.listen(3000, function () {
  console.log('Listening on port 3000...')
})
