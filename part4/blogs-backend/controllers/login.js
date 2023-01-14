const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const passwordCorrect =
		// @ts-ignore
		user === null ? false : bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({ error: 'invalid username or password' });
	}

	const userForToken = { user: user.username, id: user.id };
	// token expires in 60*60 seconds, that is, in one hour
	// @ts-ignore
	const token = jwt.sign(userForToken, config.SECRET);

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
