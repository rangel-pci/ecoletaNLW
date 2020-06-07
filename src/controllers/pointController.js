const Point = require("../models/Point");

class pointController{
	
	async index(req, res) {
		const city = req.query.search;

	    try {
	        const view = await Point.findByCity(city);
	        return res.render(view.path, view.args);
	    } catch (err) {
	        console.error('error', err);
	    }
	}
	
		
	async store(req, res){
		const data = req.body;

		try {
	        const view = await Point.create(data);
	        return res.render(view.path, view.args);
	    } catch (err) {
	        console.error('error', err);
	    }
	}
}

module.exports = new pointController();