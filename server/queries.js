const db = require('./db/conn');

const getBlogs = (request, response) => {
   db.select('*')
   .from('blogs')
   .then(blogs => {
    response.status(200).json(blogs);
   })
}

const getBlogById = (request, response) => {
  const id = parseInt(request.params.id)

}

const createBlog = (request, response) => {
  const { email, fullname, img, content, likes } = request.body

  pool.query('INSERT INTO Blogs (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Blog added with ID: ${results.insertId}`)
  })
}

const updateBlog = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE Blogs SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Blog modified with ID: ${id}`)
    }
  )
}

const deleteBlog = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Blogs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Blog deleted with ID: ${id}`)
  })
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}