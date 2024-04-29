const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

// These lines will be explained in detail later in the unit
app.use(express.json());// process json
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
// These lines will be explained in detail later in the unit

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://CQUpass:admin@cluster0.pvzye.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Global for general use
let currCollection;

client.connect(err => {
   currCollection = client.db("myDatabase").collection("myCollection");
  // perform actions on the collection object
  console.log ('Database up!')
 
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})


 
app.get('/getData', function (req, res) {
  
   //console.log("GET request received");  
       
      currCollection.find({}, {projection:{_id:0}}).toArray( function(err, docs) {
		if(err) {
		  console.log("Some error.. " + err);
		} else {
		   console.log(JSON.stringify(docs) + " have been retrieved");
		   res.send(JSON.stringify(docs));
		}

	});

});



app.post('/postData', function (req, res) {
    
    //console.log("POST request received : " + JSON.stringify(req.body)); 
    
    currCollection.insertMany([req.body], function(err, result) {
	       if (err) {
				console.log(err);
	       }else {
			    console.log(JSON.stringify(req.body) + " have been uploaded"); 
		    	    res.send(JSON.stringify(req.body));
		 }// end
		
	});
       

});
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) 
});
