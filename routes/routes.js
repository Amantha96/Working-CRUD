const express = require('express');
const router = express.Router();

const posts = require('../models/posts');

router.post('/post/save', (req, res) => {
    let newPost = new posts(req.body);

    newPost.save()
        .then(() => {
            console.log('Post saved successfully');
            return res.status(200).json({
                success: "post saved successfully"
            });
        })
        .catch((err) => {
            console.error('Error saving post: ', err);
            return res.status(400).json({
                error: err
            });
        });
});


router.get('/posts', (req, res) => {
    posts.find()
        .then((foundPosts) => {
            return res.status(200).json({
                success: true,
                existingPosts: foundPosts
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            });
        });
});



router.put('/post/update/:postId', (req, res) => {
    posts.findByIdAndUpdate(req.params.postId, { $set: req.body })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    error: "Post not found"
                });
            }
            return res.status(200).json({
                success: "Post updated successfully"
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            });
        });
});


router.delete('/post/delete/:postId', (req, res) => {
    posts.findByIdAndRemove(req.params.postId)
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    error: "Post not found"
                });
            }
            return res.status(200).json({
                success: "Post deleted successfully"
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            });
        });
});

module.exports = router;
