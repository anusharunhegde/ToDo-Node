var express=require('express');

var todoList=require('./routes/routes');
//setting up express app
var app=express();

//using static files
app.use(express.static('./public'));

//all the routes
todoList(app);

//setting up server
app.listen(4000,function(){
	console.log('listening at port 4000');
});