module.exports=function(app){

var mongoose=require('mongoose');
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//database setup
mongoose.connect('mongodb://localhost/myTodos');

var Schema=mongoose.Schema;

var todoSchema=new Schema({
	text:String
});

var Todo=mongoose.model('Todo',todoSchema);

//all routing info
app.get('/todos',function(req,res){
	
	Todo.find(function(err,todos){
		if(err) throw err;
		res.send(todos);
	});
});

app.post('/todos',function(req,res){

	 Todo.create({
            text : req.body.text
           
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.send(todos);
            });
        });
});

app.delete('/todos/:item',function(req,res){

	Todo.remove({_id:req.params.item},function(err,todo){
		if(err) throw err;
		// get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
	});
});
 
};//end of routes

