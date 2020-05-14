import React, { useState } from 'react';

import axios from 'axios';

const initialComment = { text: '' };

const Post = (props) => {
	const [newComment, setNewComment] = useState(initialComment);
	const [editing, setEditing] = useState(false);
	const [editedPost, setEditedPost] = useState({
		title: props.post.title,
		contents: props.post.contents,
	});

	const getDataWithComments = (id) => {
		axios
			.get(`http://localhost:4000/api/posts/${id}/comments`)
			.then((res) => {
				props.getData();
				console.log('Comment added', res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const handleCommentInput = (e) => {
		setNewComment({ text: e.target.value, id: props.post.id });
	};

	const addComment = (e) => {
		e.preventDefault();
		axios
			.post(
				`http://localhost:4000/api/posts/${props.post.id}/comments`,
				newComment
			)
			.then((res) => {
				getDataWithComments(props.post.id);
				setNewComment(initialComment);
			})
			.catch((err) => console.log(err));
	};

	const deletePost = (id) => {
		console.log('post id', id);
		axios
			.delete(`http://localhost:4000/api/posts/${id}`)
			.then((res) => {
				console.log('Deleted post:', res.data);
				props.getData();
			})
			.catch((err) => console.log(err));
	};

	const postEditing = () => {
		setEditing(true);
	};

	const handlePostChange = (e) => {
		setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
	};

	const postSubmit = (e) => {
		e.preventDefault();
		setEditing(false);
		console.log(editedPost);
		axios
			.put(`http://localhost:4000/api/posts/${props.post.id}`, editedPost)
			.then((res) => {
				console.log(res.data.id);
				let updatedPosts = props.posts.map((post) =>
					post.id === res.data.id ? res.data : post
				);
				setEditing(false);
				props.updatePosts(updatedPosts);
				props.getData();
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{' '}
			{!editing ? (
				<li key={props.post.id}>
					<div className="post-header">
						<h3>{props.post.title}</h3>
						<span onClick={postEditing}>...</span>
						<span onClick={() => deletePost(props.post.id)}>X</span>
					</div>
					<p>{props.post.contents}</p>
					<form className="form-comments" onSubmit={addComment}>
						<input
							type="text"
							name="text"
							placeholder="Comment..."
							value={newComment.text}
							onChange={handleCommentInput}
						/>
						<button>Add</button>
					</form>
				</li>
			) : (
				<li>
					<form className="post-editing" onSubmit={postSubmit}>
						<input
							type="text"
							name="title"
							value={editedPost.title}
							onChange={handlePostChange}
						/>
						<textarea
							type="text"
							name="contents"
							value={editedPost.contents}
							onChange={handlePostChange}
						/>
						<button>Save</button>
					</form>
				</li>
			)}
		</>
	);
};

export default Post;
