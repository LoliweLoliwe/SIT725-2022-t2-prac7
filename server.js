require('dotenv').config()
var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/addNumber/:n1/:n2', function(request, response) {
  response.json({sendStatus: 200});
  
  //response.sendStatus(200);
})

const addNumbers = (number1, number2) => {
  var num1 = parseInt(number1)
  var num2 = parseInt(number2)
  var result = num1 + num2;
  return result;
}

app.get("/addTwoNumbers",(req,res) => {
  var number1 = req.query.number1;
  var number2 = req.query.number2;
  var result = addNumbers(number1,number2)
  res.json({statusCode: 200, data: result, message: "Success"})
})

const cardList = [
    {
        title: "Mjita 2",
        image: "haircut.jpg",
        link: "About transformation",
        desciption: "Demo desciption about a man having a haircut"
    },
    {
        title: "Sir",
        image: "after.jpg",
        link: "About a man afterwards",
        desciption: "Demo desciption of a man in a suit"
    }
  ]

const MongoClient = require('mongoDb').MongoClient;

//database connection ...
const uri = "mongodb+srv://Loliwe:ndimlo@cluster0.cdprnzl.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri,{ useNewUrlParser: true })

const createColllection = (collectionName) => {
  client.connect((err,db) => {
    projectCollection = client.db().collection(collectionName);
    if(!err) {
      console.log('MongoDB Connected')
    }
    else {
      console.log("DB Error: ", err);
      process.exit(1);
    } 
  })
}

app.post('/api/projects',(req,res) => {
  console.log("New Project added", req.body)
  var newProject = req.body;
  insertProjects(newProject,(err,result) => {
    if(err) {
      res.json({statusCode: 400, message: err})
    }
    else {
      res.json({statusCode: 200, message:"Project Successfully added", data: result})
    }
  })
})
  
// insert project...
const insertProjects = (project,callback) => {
  projectCollection.insert(project,callback);
}

app.get('/api/projects',(req,res) => {
  getProjects((err,result) => {
    if(err) {
      res.json({statusCode: 400, message: err})
    }
    else {
      res.json({statusCode: 200, message:"Success", data: result})
    }
  })
})

// get project...
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
}
 

var port = process.env.port || 3000;

app.listen(port,()=>{
  console.log("App listening to "+ port)
})