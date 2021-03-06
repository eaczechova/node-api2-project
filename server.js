const express = require('express');
const CORS = require('cors');

const postsRouter = require('./Posts/postsRouter.js');

const server = express();

server.use(express.json());
server.use(CORS());

server.use('/api/posts', postsRouter);
server.use('/api/messages', postsRouter);

server.get('/', (req, res) => {
	res.send(`<h1>Hello Posts</h1>`);
});

module.exports = server;
