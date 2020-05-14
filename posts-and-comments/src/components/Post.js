import React, { useState } from 'react';

import axios from 'axios';

const initialComment = { text: '' };

const Post = (props) => {
	const [newComment, setNewComment] = useState(initialComment);

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

	return (
		<>
			<li key={props.post.id}>
				<div className="post-header">
					<h3>{props.post.title}</h3>
					<span>...</span>
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
		</>
	);
};

export default Post;
