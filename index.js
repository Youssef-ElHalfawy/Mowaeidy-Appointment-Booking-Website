const app = require("./app");

const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;
//console.log(port);
app.listen(port, (err) => {
	if (!err) return console.log(`Server Connected Successfully on Port ${port}`);
});
