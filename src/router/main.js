module.exports = (express) => {
	const router = express.Router();

	router.get('/', (req, res) => {
		res.render("home");
	});

	return router;
}