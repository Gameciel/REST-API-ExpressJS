const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const PORT = 2000;

const app = express();

app.use(cors());
app.use(bodyParser());

// get
app.get("/user", (request, response) => {
	response.status(200).send(JSON.parse(fs.readFileSync("./data/user.json")));
});

// post
app.post("/user", (request, response) => {
	const users = JSON.parse(fs.readFileSync("./data/user.json"));
	users.push(request.body);

	fs.writeFileSync("./data/user.json", JSON.stringify(users));

	response.json({
		status: "ok",
		message: "data successfully added",
	});
});

// delete
app.delete("/user", (request, response) => {
	const users = JSON.parse(fs.readFileSync("./data/user.json"));

	const indexAt = users.findIndex(user => user.id == request.query.id);
	users.splice(indexAt, 1);

	fs.writeFileSync("./data/user.json", JSON.stringify(users));

	response.json({
		status: "ok",
		message: "data successfully deleted",
	});
});

// patch
app.patch("/user", (request, response) => {
	const users = JSON.parse(fs.readFileSync("./data/user.json"));

	const indexAt = users.findIndex(user => user.id == request.query.id);

	const incomingKeys = Object.keys(request.body);

	incomingKeys.forEach(key => {
		if (users[indexAt][key]) {
			users[indexAt][key] = request.body[key];
		}
	});

	fs.writeFileSync("./data/user.json", JSON.stringify(users));

	response.json({
		status: "ok",
		message: `Patch request for user id ${request.query.id} succeeded`,
	});
});

// put
app.put("/user", (request, response) => {
	const users = JSON.parse(fs.readFileSync("./data/user.json"));

	const indexAt = users.findIndex(user => user.id == request.query.id);
	users[indexAt] = request.body;

	fs.writeFileSync("./data/user.json", JSON.stringify(users));

	response.json({
		status: "ok",
		message: `Put request for user id ${request.query.id} succeeded`,
	});
});

app.listen(PORT, () => {
	console.log(`server running @ ${PORT}`);
});
