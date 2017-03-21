module.exports = (express) => {
	const router = express.Router();

	router.get('/', (req, res) => {
		res.render("main");
	});

	return router;
}