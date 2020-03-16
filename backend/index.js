const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const config = require('./config.json');
const Project = require('./models/projects.js');
const User = require('./models/users.js');

// Port
const port = 3000;

// Connect to db
const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/formative3?retryWrites=true&w=majority`;
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

app.get('/', (req, res) => res.send('Your application is working fam!'));

//register user
app.get('/viewUsers', (req,res)=>{
	User.find().then(result =>{
		res.send(result);
	});
});

//Register users
app.post('/registerUser', (req, res)=>{
	//checking if user is found in the db already.
	User.findOne({username:req.body.username},(err, userResult)=>{
		if(userResult){
			res.send('username taken already, Please try another one');
		} else {
			const hash = bcryptjs.hashSync(req.body.password);
			const user = new User({
				user_id : new mongoose.Types.ObjectId,
				username  : req.body.username,
				email : req.body.email,
				password  : hash
		  });
		  //Save to database and notify the user accordingly
			user.save().then(result =>{
				res.send(result);
			}).catch(err => res.send(err));
		}
	});
});

// Loging an exsisting user
app.post('/loginUser' , (req,res) =>{
	User.findOne({username:req.body.username},(err,userResult) =>{
		if(userResult){
			// If the user has successfully entered their  details
			if(bcryptjs.compareSync(req.body.password, userResult.password)){
				res.send(userResult);
			}
			// If the user incorrectly enters their login details that exsist in the database
			else{
				res.send('not authorized');
			}
		}
		else{
			res.send('User is not found. Please register');
		}
	});
});	

// Adding a project
app.post('/registerProject' , (req,res) =>{
	const project = new Project({
		project_id : new mongoose.Types.ObjectId,
		projectName : req.body.projectName,
		projectBrief : req.body.projectBrief,
		projectImage : req.body.projectImage,
		projectLink : req.body.projectLink,
		user_id : req.body.user_id
	});
	// Pushes product to database
	project.save().then(result =>{
		res.send(result);
	}).catch(err =>res.send(err));
});

// Modifying a project
app.patch('/updateProject/:id' , (req,res) =>{
	// stores inputted project ID
	const idParam = req.params.id;
	// Finds the relating Project with the same id
	Project.findById(idParam , (err,project) =>{
		// Updates the listed properties
		const updateProject = {
			projectName : req.body.projectName,
			projectBrief : req.body.projectBrief,
			projectImage : req.body.projectImage,
			projectLink : req.body.projectLink,
			user_id : req.body.user_id
		};
		// Updates the one matching project instead of all of them
		Project.updateOne({project_id:idParam}, updateProject).then(result =>{
			res.send(result);
		}).catch(err =>res.send(err));
	// If the user has entered the wrong id and the project cannot be found
	}).catch(err =>res.send('Project not found'));
});

// View projects
app.get('/viewProjects', (req,res) =>{
	Project.find().then(result =>{
		res.send(result);
	});
});

// Delete a project
app.delete('/deleteProject/:id', (req,res) =>{
	const idParam = req.params.id;
	Project.findOne({project_id:idParam}, (err,project) =>{
		if (project){
			Project.deleteOne({project_id:idParam}, err =>{
				res.send('Project successfully deleted');
			});
		} else {
			res.send('Error: Not Found');
		}
	}).catch(err => res.send(err));
});

// DO NOT ADD CODE PAST THIS POINT

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
