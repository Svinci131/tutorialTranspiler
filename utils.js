var chalk = require("chalk");

module.exports = {
	messages: {
		blue: function (message) { console.log(chalk.blue(message))},
		green: function (message) { console.log(chalk.green(message))},
		red: function (message) { console.log(chalk.red(message))}
	}
};
