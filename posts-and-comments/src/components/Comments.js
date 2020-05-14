import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Comments = (props) => {
	return (
		<>
			<form onSubmit={props.addComment}>
				<input
					type="text"
					name="text"
					placeholder="Comment..."
					value={props.newComment.text}
					onChange={props.handleChange}
				/>
				<button>Add Comment</button>
			</form>
		</>
	);
};

export default Comments;
