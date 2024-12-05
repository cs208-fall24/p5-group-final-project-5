import express from 'express'
import sql from 'sqlite3'

const sqlite3 = sql.verbose()

// Create an in-memory database for testing
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

// Start the web server
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})
//Student 1 stuff

db.run(`CREATE TABLE IF NOT EXISTS student1_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT NOT NULL)`)
//get student 1 page
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
    const stmt = db.prepare('INSERT INTO todo (comment) VALUES (?)')
    stmt.run(req.body.student1_table)
    res.redirect('/commentsS1')
    stmt.finalize()
})

//Student 1 delete comment
app.post('/deleteS1', function (req, res) {
    console.log('deleting comment')
    const stmt = db.prepare('DELETE FROM todo WHERE id = ?')
    stmt.run(req.body.id)
    res.redirect('/commentsS1')
    stmt.finalize()
})




//student2 functionality
db.run(`CREATE TABLE IF NOT EXISTS zombTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT NOT NULL)`)

//create JSON of comment rows
app.get('/student2', function (req, res) {
    const local = { comments: [] }
    db.each('SELECT id, comment FROM zombTable ORDER BY Random()', function (err, row) {
        if (err) {
        console.log(err)
        } else {
        local.comments.push({ id: row.id, comment: row.comment })
        }
    }, function (err, numrows) {
        if (!err) {
        res.render('student2', local)
        } else {
        console.log(err)
        }
    })
})

//get comments page
app.get('/comments', function (req, res) {
    const local = { comments: [] }
    db.each('SELECT id, comment FROM zombTable ORDER BY Random()', function (err, row) {
        if (err) {
        console.log(err)
        } else {
        local.comments.push({ id: row.id, comment: row.comment })
        }
    }, function (err, numrows) {
        if (!err) {
        res.render('student2/comments', local)
        } else {
        console.log(err)
        }
    })
})

//SQL Insert of Comment
app.post('/comments', function (req, res) {
    if(req.body.commentbox && req.body.commentbox.trim() != ""){
        const stmt = db.prepare('INSERT INTO zombTable (comment) VALUES (@0)')
        stmt.run(req.body.commentbox)
        stmt.finalize()
    }
    res.redirect('comments')
})

//SQL Delete of Comment
app.post('/delete', function (req, res) {
    const stmt = db.prepare('DELETE FROM zombTable where id = (@0)')
    stmt.run(req.body.id)
    stmt.finalize()
    res.redirect('comments')
})

//SQL Edit of Comment
app.post('/edit', function (req, res) {
    if(req.body.editbox && req.body.editbox.trim() != ""){
        console.log("editted")
        const stmt = db.prepare('UPDATE zombTable SET comment = (@0) where id = (@1)')
        stmt.run(req.body.editbox, req.body.id)
        stmt.finalize()
    }
    res.redirect('comments')

})

//Student 3
db.run(`CREATE TABLE IF NOT EXISTS student3_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT NOT NULL
)`)

// Render the main page for student 3
app.get('/student3', function (req, res) {
    console.log('GET /student3 called');
    const local = { comments: [] };

    db.all('SELECT id, comment FROM student3_comments ORDER BY RANDOM() LIMIT 5', function (err, rows) {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.render('student3', local); 
        }

        local.comments = rows.map(row => ({
            id: row.id,
            comment: row.comment
        }));

        res.render('student3', local);
    });
});

//Render all comments for Student 3
app.get('/student3/commentsS3', function (req, res) {
    console.log('GET /student3/commentsS3 called');
    const local = { comments: [] };

    db.all('SELECT id, comment FROM student3_comments', function (err, rows) {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.render('student3/commentsS3', local); 
        }

        local.comments = rows.map(row => ({
            id: row.id,
            comment: row.comment
        }));

        res.render('student3/commentsS3', local);
    });
});

// Handle adding a new comment
app.post('/student3/addCommentS3', function (req, res) {
    const commentInput = req.body.todo;
    if (!commentInput || commentInput.trim() === '') {
        return res.redirect('/student3/commentsS3');
    }

    console.log('Adding comment for Student 3');
    const stmt = db.prepare('INSERT INTO student3_comments (comment) VALUES (?)');
    stmt.run(commentInput);
    stmt.finalize();
    res.redirect('/student3/commentsS3');
});

//Handle editing a comment
app.post('/student3/editS3', function (req, res) {
    const { id, newComment } = req.body;
    if (!newComment || newComment.trim() === '') {
        return res.redirect('/student3/commentsS3');
    }

    console.log(`Editing comment ID ${id} with new text: ${newComment}`);
    const stmt = db.prepare('UPDATE student3_comments SET comment = ? WHERE id = ?');
    stmt.run(newComment, id, function (err) {
        if (err) {
            console.error('Error updating comment:', err);
        }
        stmt.finalize();
        res.redirect('/student3/commentsS3');
    });
});

//Handle deleting a comment
app.post('/student3/deleteS3', function (req, res) {
    const commentId = req.body.id;
    console.log(`Deleting comment for Student 3 with ID: ${commentId}`);
    const stmt = db.prepare('DELETE FROM student3_comments WHERE id = ?');
    stmt.run(commentId);
    stmt.finalize();
    res.redirect('/student3/commentsS3');
});

// Start the web server
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})




