// Since we are using mongoose, we need to require it
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	project_id : mongoose.Schema.Types.ObjectId, 
	projectName : String ,
	projectBrief : String ,
	projectImage : String ,
	projectLink : String ,
	user_id : String//{
		//type : mongoose.Schema.Types.ObjectId,
		// ref : 'User'
	//}
});

module.exports =  mongoose.model('Project' , projectSchema);