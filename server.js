var express = require('express');
var app = express();
app.use(express.static(__dirname+'/public'));
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());

var mongoose = require('mongoose');
/*app.get("/process",function(req,res){
    res.json(process.env);
});*/
//mongoose.connect('mongodb://localhost/test');
/*var connectionString =  'mongodb://localhost/test'||'mongodb://christine:christine@ds021884.mlab.com:21884/lichunhua';*/
var connectionString =  'mongodb://christine:christine@ds021884.mlab.com:21884/lichunhua'||'mongodb://localhost/test';
mongoose.connect(connectionString);



var WebSiteSchema = new mongoose.Schema({
    
},{collection:'website'});
var WebSiteModel = mongoose.model("WebSiteModel",WebSiteSchema);

var WeatherSchema = new mongoose.Schema({
    
},{collection:'weather'});
var WeatherModel = mongoose.model("WeatherModel",WeatherSchema);

var PopulationAffectedSchema = new mongoose.Schema({
    "Code":String,
    
    "State":String,
    
    "TotalPopulationAffected": Number
    
},{collection:'PopulationAffected'});
var PopulationAffectedModel = mongoose.model("PopulationAffectedModel",PopulationAffectedSchema);
/*var a=new NewWeatherModel({State:"aa"});
a.save();*/

var StateSchema = new mongoose.Schema({
    
},{collection:'state'});
var StateModel = mongoose.model("StateModel",StateSchema);



app.get('/api/websites',function(req,res){
    WebSiteModel.find(function(err,docs){
         res.json(docs);
        });
});       
app.get('/api/weather',function(req,res){
    WeatherModel.find(function(err,docs){
         res.json(docs);
        });
});   

app.get('/api/state',function(req,res){
    StateModel.find(function(err,docs){
         res.json(docs);
        });
}); 
app.get('/api/PopulationAffected',function(req,res){
    PopulationAffectedModel.find(function(err,docs){
         res.json(docs);
        });
});
app.post('/api/PopulationAffected',function(req,res){
    var PopulationAffected = new PopulationAffectedModel(req.body);
    PopulationAffected.save(function(){
        PopulationAffectedModel.find(function(err,docs){
        res.json(docs);
    });
    
    });
});
/*app.get('/api/websites/:id',function(req,res){
    WebSiteModel.findById(req.params.id,function(err,doc){
        res.json(doc);
    });
});
app.delete('/api/websites/:id',function(req,res){
    WebSiteModel.findById(req.params.id,function(err,doc){
         doc.remove();
         WebSiteModel.find(function(err,data){
                res.json(data);
            });
    });
});
app.post('/api/websites',function(req,res){
    var site1 = new WebSiteModel(req.body);
    site1.save(function(){
        WebSiteModel.find(function(err,docs){
        res.json(docs);
    });
    
    });
});
app.put('/api/websites/:id',function(req,res){
    WebSiteModel.update({_id:req.params.id},{$set:req.body},function(err,doc){});
});*/
/*var ip='127.0.0.1';
var port=3000;*/
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port,ip);