const Logs = require("../models/Logs");

module.exports = {
	addLogInDb: function (logObject) {
        const logsObj = new Logs(logObject)
        logsObj.save()
	}
};