console.log(`Formative 3.2`);
let url;

// User (register & login) form variables
let newUserName = '';
let newEmail = '';
let password = '';
let newPassword = '';
let confirmPassword = '';

function clearFields(){
	// Register new user field
	document.getElementById('newUserName').value = '';
	document.getElementById('newEmail').value = '';
	document.getElementById('newPassword').value = '';
	document.getElementById('confirmPassword').value = '';
}

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

// Document ready function starts
$(document).ready(function(){

//Register User

	$('#registerUserForm').submit(function(){

	event.preventDefault();

	let newUserName = $('#newUserName').val();
	let newEmail = $('#newEmail').val();
	let newPassword = $('#newPassword').val();
		let confirmPassword = $('#confirmPassword').val();

		// Validates to make sure that the user has entered the right password
				if(newPassword !== confirmPassword){
					alert('Please Make sure passwords match');
				} else{

					password = confirmPassword;

	console.log(newUserName,newEmail, newPassword);

		// Conditional statement that ensures that the user has filled out all of the fields.
	// if (newUserName == '' || newEmail == '' || newPassword == ''){
	if((username !== '') && (newEmail !== '') && (password !== '')){

	//   alert('Please enter all details');
	// } else {

	$.ajax({
		url :`${url}/registerUser`,
		type :'POST',
		data:{
		username : newUserName,
		email : newEmail,
		password : newPassword
		},

		success : function(newUserFromMongo){
		console.log(newUserFromMongo);
		if (!(newUserFromMongo == 'username taken already. Please try another one')) {
			alert('You are registered');
			$('#loginUserModal').show();
			$('#registerNewUserModal').hide();
			//$('#loginUserBtn').show();
			$('#registerNewUserBtn').hide();
			$('#registerUserForm').hide();
					clearFields();
		 } else {
			 alert('Congrats');
			$('#newUserName').val('');
			$('#newEmail').val('');
			$('#newPassword').val('');
		}
		}, //success
		error:function(newUserFromMongo){
		console.log('Already an exsisting member');
		}//error


	});//ajax

	} else {
	alert('Fillout all fields');
	}
}
});//submit function for registerForm

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

	// Create card buttons for delete and modify
	function createEditBtns(){

		let loggedUser = sessionStorage['userId'];
		if(sessionStorage['userId'] == loggedUser){
		
		document.getElementById('cardFooter').innerHTML +=
			`<div class="row">
				<div class="col-6">
					<button id="${projectsFromMongo[i].project_id}" class="btn btn-block btn-primary project-update">Update</button>
				</div>
				<div class="col-6">
					<button id="${projectsFromMongo[i].project_id}" class="btn btn-block btn-danger project-delete">Delete</button>
				</div>
			</div>`;
		}
	}

	// View Project Cards
	// Needs - BtnClick id | if parameter | author name info for card | Btn link for View More card btn 

	$('.nav-user').click(function(){
	//
		let projectUserId = this.id;
		$.ajax({
			url : `${url}/viewProjects`,
			type : 'GET',
			dataType : 'json',
			success : function(projectsFromMongo) {
				console.log(projectsFromMongo);

				for (let i = 0; i < projectsFromMongo.length; i++) {
					if(projectsFromMongo[i].user_id == projectUserId){
						document.getElementById('printOut').innerHTML +=
						`<div class=col-6>
							<div class="card">
								<img src="${projectsFromMongo[i].projectImage}" class="card-img-top" alt="Project Image">
						
								<div class="card-body">
									<h5 class="card-title">${projectsFromMongo[i].projectName}</h5>
									<p class="card-text">${projectsFromMongo[i].projectBrief}</p>
									<a id="${projectsFromMongo[i].project_id}" href="#" class="btn btn-primary">View More</a>
								</div>
								<div id="cardFooter" class="card-footer text-muted">
						
								</div>
							</div>
						</div>`;
						createEditBtns();
					}
				}
				deleteProjectBtnClick();
				updateProjectBtnClick();
			}, //success
			error:function(){
				console.log('Error: Cannot call API');
			}
		});
	});
	
	// Delete a prject function
	function deleteProjectBtnClick(){
		$('.delete-project').on('click', function(){

			let projectToDeleteId = this.id;

			if(this.id === projectToDeleteId){
				$.ajax({
					url : `${url}/deleteProject/${projectToDeleteId}`,
					type : 'DELETE',
					dataType : 'json',
					success : function(){
						console.log('project deleted');
					},
					error : function(){
						console.log('error: cannot call api');
					}
				});
			}
		});
	}

	// Update a project
	function updateProjectBtnClick(){
		let projectToModify = this.id;
		$('.update-project').on('click', function(){
			if(this.id === projectToModify){
				$.ajax({
					url : `${url}/deleteProject/${projectToDeleteId}`,
					type : ,
					dataType : ,
					success : function(){
					
					},
					error : function(){
					
					}
				});
			}
		});
	}

});
// Document ready function ends
