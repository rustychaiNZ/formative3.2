const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const config = require('./config.json');
const product = require('./Products.json');
const Project = require('./models/projects.js');
const User = require('./models/users.js'); 

// Port
const port = 3000;

// Connect to db
const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/shop?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected!'))
.catch(err =>{
	console.log(`DBConnectionError: ${err.message}`);
});

//test the connectivity
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('We are connected to mongo db');
});

app.use((req,res,next)=>{
	console.log(`${req.method} request for ${req.url}`);
	// Include this to go to the next middleware
	next();
});

//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
// All files from public folder must be included
app.use(express.static('public'));

// Adding a project
app.post('/registerProject' , (req,res) =>{
	const project = new Project({

	});
});

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// DO NOT ADD CODE PAST THIS POINT!