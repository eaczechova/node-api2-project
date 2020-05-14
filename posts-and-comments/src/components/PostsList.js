import React from 'react';
import Post from './Post';

const PostsList = (props) => {
	console.log(props, 'in post');
	return (
		<>
			<ul>
				{props.posts &&
					props.posts.map((post) => (
						<Post
							post={post}
							getData={props.getData}
							key={post.id}
							updatePosts={props.setPosts}
							posts={props.posts}
						/>
					))}
			</ul>
		</>
	);
};

export default PostsList;
