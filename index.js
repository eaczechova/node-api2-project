require('dotenv').config();
const app = require('./server.js');

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${[port]}`);
});
