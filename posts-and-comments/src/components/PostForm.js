import React, { useState } from 'react';
import axios from 'axios';

const initialPost = { title: '', contents: '' };

const PostForm = (props) => {
	const [newPost, setNewPost] = useState(initialPost);

	const handlePostInput = (e) => {
		setNewPost({ ...newPost, [e.target.name]: e.target.value });
	};

	const addPost = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4000/api/posts', newPost)
			.then(() => {
				props.getData();
				setNewPost(initialPost);
			})
			.catch((err) => console.log(err));
	};

	return (
		<form onSubmit={addPost} className="form-post">
			<input
				type="text"
				name="title"
				placeholder="Title..."
				value={newPost.title}
				onChange={handlePostInput}
			/>
			<textarea
				type="text"
				name="contents"
				placeholder="Your post contents..."
				value={newPost.contents}
				onChange={handlePostInput}
			/>
			<button>Add</button>
		</form>
	);
};

export default PostForm;
