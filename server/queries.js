const db = require('./db/conn');

const getBlogs = (req, res) => {
   db.select('*')
   .from('blogs')
   .then(blogs => {
    res.status(200).json({message: "success", blogs});
   })
}

const getBlogById = (req, res) => {
  const id = parseInt(req.params.id)
  db.select('*')
   .from('blogs')
   .where({
    blog_id: id
   })
   .then(blogs => {
    res.status(200).json({message: "success", blog: blogs[0]});
   })
}

const createBlog = (req, res) => {
  const { email, fullname, img, content, likes } = req.body

    db('blogs')
    .insert({email, fullname, img, content, likes})
    .then(blog => {
      console.log(`Blog added with ID: ${results.insertId}`);
      res.status(201).json({message: "success", blog});
    })

}

const updateBlog = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE Blogs SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).send(`Blog modified with ID: ${id}`)
    }
  )
}

const deleteBlog = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM Blogs WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).send(`Blog deleted with ID: ${id}`)
  })
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}