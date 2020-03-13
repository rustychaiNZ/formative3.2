console.log(`Formative 3.2`);

// User (register & login) form variables
let username = '';
let email = '';
let password = '';
let enteredPassowrd = '';
let confirmedPassword = '';

// Project form variables
let projectName = '';
let projectBrief = '';
let projectImage = '';
let projectLink = '';

// Get url and prot from config.json
$.ajax({
	url : 'js/config.json',
	type : 'GET',
	dataType : 'json',
	success : function(configData){
		console.log(configData);
		url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
		console.log(url);
	},
	error : function(){
		console.log('Failed to get url for mongoDB');
	}
});

sessionStorage.setItem('userId', 23);
console.log(sessionStorage);

// create project button created dynamically
if(sessionStorage[`userId`]){
	document.getElementById('addProjectBtnContainer').innerHTML = 
	`<button id="addProjectBtn" class="btn btn-lg btn-primary btn-block" data-toggle="modal" data-target="#createProjectModal">Add Project</button>`;
} else{
	console.log('no user logged in');
}

// Document ready fucntion starts
$(document).ready(function(){

	// Add a product
	$('#registerProjectForm').submit(function(){
		event.preventDefault();
		console.log('submit');
 		
 		projectName = $('#newProjectName').val();
		projectBrief = $('#projectBrief').val();
		projectImage = $('#projectPicture').val();
		projectLink = $('#projectExternalLink').val();
		userId = '23';// sessionStorage.getItem('userId');
 		
 		if((projectName !== '') && (projectBrief !== '') && (projectImage !== '') && (projectLink !== '')){
 			console.log('testing');
 			$.ajax({
 				url : `${url}/registerProject`,
 				type : 'POST',
 				data : { 
 					projectName : projectName ,
 					projectBrief : projectBrief ,
 					projectImage : projectImage , 
 					projectLink : projectLink , 
 					user_id : sessionStorage.getItem(`userId`)
 				},
 				success : function(data){
 		
 				}, 
 				error : function(){
 					alert('error: ');
 				}
 			});
 		} else{
 			alert('Please fill in all fields'); 
 		}
	});

	// Delete a prject
	fucntion deleteProjectBtnClick(){
		$('.delete-project').on('click', function(){

			let projectToDeleteId = this.id;

			if(this.id === projectToDeleteId){
				
			}
		});
	}

	// Update a project

});
// Document ready function ends