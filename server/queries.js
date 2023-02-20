const db = require('./db/conn');

const getBlogs = (req, res) => {
   db.select('*')
   .from('blogs')
   .then(blogs => {
    res.status(200).json({message: "success", blogs});
   })
}

const getBlogById = (req, res) => {
  const id = parseInt(req.params.blog_id)
  console.log(id);
  db.select('*')
   .from('blogs')
   .where({
    blog_id: id
   })
   .then(blogs => {
    console.log(blogs)
    res.status(200).json({message: "success", blog: blogs[0]});
   })
}

const createBlog = (req, res) => {
  const { email, fullname, title, img, content, likes, created_on } = req.body

    db('blogs')
    .insert({
      email,
      fullname,
      img, 
      title, 
      content, 
      likes,
      created_on
    })
    .then(blog => {
      console.log(blog);
      db('blogs').select('*').then(res => console.log(res));
      console.log(`Blog added with ID: ${blog.blog_id}`);

      res.status(201).json({message: "success", blog});
    })
}

const updateBlog = (req, res) => {
  // const id = parseInt(req.params.id)
  // const { name, email } = req.body

  // pool.query(
  //   'UPDATE Blogs SET name = $1, email = $2 WHERE id = $3',
  //   [name, email, id],
  //   (err, results) => {
  //     if (err) {
  //       throw err
  //     }
  //     res.status(200).send(`Blog modified with ID: ${id}`)
  //   }
  // )
}

const deleteBlog = (req, res) => {
  const id = parseInt(req.params.blog_id)

    db('blogs')
    .delete()
    .where('blog_id', id)
    .then(result => {
      res.status(200).send({ message: `Blog deleted with ID: ${id}`});
    })
}

const likeBlog = (req, res) => {
  const id = parseInt(req.params.blog_id);
  db('blogs')
  
}

const dislikeBlog = (req, res) => {

}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}