import React from 'react';
import Post from './Post';

const PostsList = (props) => {
	return (
		<>
			<ul>
				{props.posts &&
					props.posts.map((post) => (
						<Post post={post} getData={props.getData} key={post.id} />
					))}
			</ul>
		</>
	);
};

export default PostsList;
