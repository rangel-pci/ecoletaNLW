const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

class Point{
	
	create(data){
		return new Promise((resolve, reject) => {
			const query = `
				INSERT INTO places(
					image,
					name,
					address,
					address2,
					state,
					city,
					items
				) VALUES(?, ?, ?, ?, ?, ?, ?);
			`;

			const { image, name, address, address2, state, city, items } = data;

			const itemsNames = items.replace(/\,+/g,', ')+'.';

			const values = [image, name, address, address2, state, city, itemsNames];

			db.run(query, values, function afterInsertData(error){
				if(error){
					console.log(data);
					const view = {path: "error-page.html", args: { src: "/create-point" }};
					resolve(view);
				}

				const success = true;
				const view = {path: "create-point.html", args: { saved: true }};

				resolve(view);
			});
		});
	}

	findByCity(city){


		return new Promise((resolve, reject) => {
			if(city === ''){
				
				const view = {path: "search-results.html", args: { total: 0 }};
				resolve(view);
			}

			db.all(`SELECT * FROM places WHERE city LIKE '%${city}%'`, function(error, rows){
				if(error){
					const view = {path: "error-page.html", args: { src: "/" }};
					resolve(view);
				}

				const total = rows.length;
				const view = {path: "search-results.html", args: { places: rows , total }};

				resolve(view);
			});
		});
	}

}

module.exports = new Point();