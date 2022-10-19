const withAuth = require("../../utils/auth");
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// find all//
// router.get('/', async (req, res) => {
//   // console.log(res)
//     try {
//       const postData = await Post.findAll({
//         include: [{ model: User }, { model: Blog, include: { model: User } }],
//       });
// console.log(postData)
//       if(!postData){
//         res.status(400).json({
//           message: 'Can not fihnd any post'
//         })
//       }
  
//       res.status(200).json(postData);
//     } catch(err) {
//       res.status(500).json(err);
//     }
//   });
  // create one///
router.post('/', withAuth, async (req, res) => {
    try {
      const { content, user_id } = req.body;
      if(req.session.user_id !== user_id){
        console.log(req.session, user_id)
        res.status(403).send ("unauthorized post request")
      }
      const newPostData = await Post.create({
        content,
        user_id,
      });
  
      res.status(200).json(newPostData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // get one by id//
router.get('/:id', async (req, res) => {
    try {
      const PostData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Blog, include: { model: User } }],
      });
  
      if (!PostData) {
        res
          .status(404)
          .json({ message: `No Post found with ID: ${req.params.id}` });
        return;
      }
    
      res.status(200).json(PostData);
    } catch {
      res.status(500).json(err);
    }
  });
  // update one by id
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//       const PostData = await Post.findByPk(req.params.id);
  
//       if (!PostData) {
//         res
//           .status(404)
//           .json({ message: `No Post found with ID: ${req.params.id}` });
//         return;
//       }
  
//       const updatePostData = await Post.update(req.body, {
//         where: {
//           id: req.params.id,
//         },
//       });

//       // delete one by id
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const deletePostData = await Post.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });

      module.exports = router;