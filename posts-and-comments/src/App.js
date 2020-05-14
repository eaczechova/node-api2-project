import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import PostForm from './components/PostForm';
import PostsList from './components/PostsList';

function App() {
	const [posts, setPosts] = useState([]);

	const getData = () => {
		axios
			.get('http://localhost:4000/api/posts')
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<h1>Comments and Posts App</h1>
			<PostForm getData={getData} />
			<Route
				exact
				path="/api/posts/"
				render={(props) => {
					return (
						<PostsList
							{...props}
							posts={posts}
							setPosts={setPosts}
							getData={getData}
						/>
					);
				}}
			/>
		</div>
	);
}

export default App;
