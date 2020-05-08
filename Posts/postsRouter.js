const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
	console.log(req.query);
	Posts.find()
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The posts information could not be retrieved.',
			});
		});
});

router.get('/:id', (req, res) => {
	Posts.findById(req.params.id)
		.then((post) => {
			if (!post.length) {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The post information could not be retrieved.',
			});
		});
});

router.get('/:id/comments', (req, res) => {
	Posts.findCommentById(req.params.id)
		.then((comments) => {
			console.log(comments)
			if (!comments) {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(200).json(comments);
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The comments information could not be retrieved.',
			});
		});
});

router.post('/', (req, res) => {
	const newPost = req.body;
	if (!newPost.title || !newPost.contents) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide title and contents for the post.' });
	}

	Posts.insert(newPost)
		.then((newPost) => {
			res.status(201).json({ id: newPost.id });
		})
		.catch((error) => {
			res.status(500).json({
				error: 'There was an error while saving the post to the database',
			});
		});
});

router.post('/:id/comments', (req, res) => {

	const newComment = {...req.body, post_id: req.params.id};
	try { 
		const comment = Posts.insertComment(newComment);
		res.status(201).json(comment);
	} catch (err) {
				console.log(err);
				res.status(500).json({ err });
	}
});

router.delete('/:id', (req, res) => {
	Posts.findById(req.params.id)
		.then((post) => {
			console.log(post);
			if (!post) {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			} else {
				Posts.remove(req.params.id);
				res.status(200).json({ id: Number(req.params.id) });
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The post could not be removed',
			});
		});
});

// router.put('/:id', (req, res) => {
// 	const changedPost = req.body;
// 	Posts.update(req.params.id, changedPost)
// 		.then((post) => {
// 			if (!post) {
// 				res
// 					.status(404)
// 					.json({ message: 'The post with the specified ID does not exist.' });
// 			} else if (!changedPost.title || !changedPost.contents) {
// 				res
// 					.status(400)
// 					.json({ errorMessage: 'Please provide title and contents for the post.' });
// 			} else {
// 				res.status(200).json(post);
// 			}
// 		})
// 		.catch((error) => {
// 			res.status(500).json({
// 				error: 'The post information could not be modified.',
// 			});
// 		});
// });

module.exports = router;
