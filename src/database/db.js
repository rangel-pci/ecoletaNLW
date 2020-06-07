const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;



//Operações
//db.serialize(() => {

	// db.run(`
	// 	CREATE TABLE IF NOT EXISTS places(
	// 		id INTEGER PRIMARY KEY AUTOINCREMENT,
	// 		image TEXT,
	// 		name TEXT,
	// 		address TEXT,
	// 		address2 TEXT,
	// 		state TEXT,
	// 		city TEXT,
	// 		items TEXT
	// 	);
	// `);

	//INSERT
// 	const query = `
// 		INSERT INTO places(
// 			image,
// 			name,
// 			address,
// 			address2,
// 			state,
// 			city,
// 			items
// 		) VALUES(?, ?, ?, ?, ?, ?, ?);
// 	`;
// 
// 	const values = [
// 		'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
// 		'Papersider',
// 		'Guilherme Gembalha, Jardim América',
// 		'Nº 260',
// 		'Santa Catarina',
// 		'Rio do Sul',
// 		'Papéis e Papelão'
// 	];
// 
// 
// 	db.run(query, values, afterInsertData);
// 
// 	function afterInsertData(error){
// 		if(error){
// 			return console.log(error);
// 		}
// 
// 		console.log('Entidade cadastrada');
// 		console.log(this);
// 	}




// 	SELECT
// 	db.all(`SELECT * FROM places`, function(error, rows){
// 		if(error){
// 			return console.log(error);
// 		}
// 
// 		console.log(rows);
// 	});

// 	DELETE
// 	db.run(`DELETE FROM places WHERE id = ?`, [1], function(error){
// 		if(error){
// 			return console.log(error);
// 		}
// 
// 		console.log('Entidade deletada');
// 	});

//});