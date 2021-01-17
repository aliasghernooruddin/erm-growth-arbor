module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
        }
		res.status(401).json({ status: false, message: "Please log in" });
	},
	forwardAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) {
			res.status(401).send({ message: "Please log in" });
		}
		res.status(200).send("Success");
	},
};