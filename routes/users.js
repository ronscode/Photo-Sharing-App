var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	const users = await User.findAll();
	console.log(users);
	res.json(users);
});

/* GET add new user. */

router.get("/register", (req, res, next) => {
	res.render("register", { title: "Register" });
});

/* POST add new user. */

router.post("/add", async (req, res, next) => {
	let { username, password, firstName, lastName, email } = req.body;
	console.log("New user form ", username, password, firstName, lastName, email);
	// Check to see if username is already taken.
	const aUser = await User.findAll({
		where: {
			username: username,
		},
	});

	if (aUser.length === 0) {
		bcrypt.hash(password, saltRounds, async (err, hash) => {
			password = hash;
			console.log(password);
			const newUser = await User.create({
				username,
				password,
				firstName,
				lastName,
				email,
			});
			// res.send("Register the new user " + newUser.id);
			res.redirect(301, "/users/login");
		});
	} else {
		res.send("The username is already in use");
	}
});

/* GET login. */

router.get("/login", (req, res, next) => {
	res.render("login", { title: "Login Page" });
});

/* POST login. */

router.post("/login", async (req, res, next) => {
	console.log("Login form submitted", req.body);
	const { username, password } = req.body;
	let aUser = await User.findAll({
		where: {
			username: username,
		},
	});
	aUser = aUser[0];
	console.log("User found", aUser.password);

	bcrypt.compare(password, aUser.password, function (err, result) {
		if (err) {
			res.send(err);
		} else {
			if (result === true) {
				res.redirect(301, `/users/${username}`);
			} else {
				res.render("login", { title: "Login" });
			}
		}
	});

	// if there is not a user show error
	// else compare password to user's hash
	// if the password doesn't match, throw error
	// else, send message user is logged in
});

/* GET user by username. */

router.get("/:username", async (req, res, next) => {
	const username = req.params.username;
	// Query my db by username
	// If user found show single user
	// Else if error show error

	const aUser = await User.findAll({
		where: {
			username: username,
		},
	});
	console.log(aUser);

	if (aUser.length === 0) {
		res.send("User not found");
	} else {
		res.render("profile", {title: "Profile", aUser: aUser[0]})
	}
});

module.exports = router;
