//express
const express = require("express");
const server = express();

//controllers
const pointController = require("./controllers/PointController");


//configura as pastas públicas
server.use(express.static("public"));

//habilita o req.body
server.use(express.urlencoded({ extended: true }));

//template engine Nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
	express: server,
	noCache: true //deixar no chache enquanto desenvolve -> tirar na fase de deploy
});


//configura as rotas
//pagina inicial
server.get("/", (req, res) =>{

	return res.render("index.html");
});

server.get("/create-point", (req, res) =>{

	return res.render("create-point.html");
});

server.post("/save-point", (req, res) =>{
	pointController.store(req, res);

});

server.get("/results", (req, res) =>{

	pointController.index(req, res);
});

server.get("*", (req, res) =>{

	return res.status(404).render("error-page.html", { text: "404, Não encontramos o que você procura. :0", src: "/" });
});



//liga o servidor
server.listen(3000);