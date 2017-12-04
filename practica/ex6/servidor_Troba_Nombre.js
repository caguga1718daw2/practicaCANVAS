//servidor
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require('fs');
var aleatori = Math.ceil(Math.random()*10);
function iniciar() {
	function onRequest(request, response) {
		var sortida;
		var pathname = url.parse(request.url).pathname;
		var consulta = url.parse(request.url, true).query;
		var res = parseInt(consulta['res']);

		console.log("Petició per a  " + pathname + " rebuda.");
		if (pathname == '/inici') {
			response.writeHead(200, {
				"Content-Type" : "text/html; charset=utf-8"
			});

			fs.readFile('./troba_Nombre.html', function(err, sortida) {
				response.writeHead(200, {
					'Content-Type' : 'text/html'
				});
				console.log(aleatori);
				response.write(sortida);
				response.end();
			});

		} else if (pathname == '/verificar') {
			response.writeHead(200, {
				"Content-Type" : "text/html; charset=utf-8"
			});
			if (res==aleatori) {
				response.write('CORRECTE');

			} else {
				response.write('INCORRECTE');

			}
			response.end();
		} else {
			response.writeHead(404, {
				"Content-Type" : "text/html; charset=utf-8"
			});
			sortida = "404 NOT FOUND";
			response.write(sortida);
			response.end();
		}

	}


	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;
