const app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs');
app.listen(1337)
function handler(req, res){
	fs.readFile(__dirname + '/index.html', function(err, data){
		if(err){
			res.writeHead(500);
			console.log('error')
			return res.end('Error')
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	})
}
let chat = io.of('/chat').on('connection', function(socket){
	socket.on('emit_from_client', function(data){

		socket.join(data.room)
		socket.emit('emit_from_server', 'You are in' + data.room);
		socket.broadcast.to(data.room).emit('emit_from_server', data.msg)
	})
})

let news = io.of('/news').on('connection', function(socket){
	socket.emit('emit_from_server', 'today' + new Date());
})