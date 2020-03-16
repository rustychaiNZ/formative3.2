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
let projectNameMemory = '';
let projectBriefMemory = '';
let projectImageMemory = '';
let projectLinkMemory = '';

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


console.log(sessionStorage);

// Document ready function starts
$(document).ready(function(){

	// Register user form submission
	$('#registerUserForm').submit(function(){
		event.preventDefault();

		newUserName = document.getElementById('newUserName').value;
		newEmail = document.getElementById('newEmail').value;
		newPassword = document.getElementById('newPassword').value;
		confirmPassword = document.getElementById('confirmPassword').value;

		// Ensures that the user has made their passwords match
		if(newPassword !== confirmPassword){
			alert('Ensure your passwords are matching');
		} else{
			// Sets the password to the one that the user has inputted
			password = confirmPassword;
			if((newUserName === '') && (newEmail === '') && (password === '')){
				alert('Please fill out all fields');
			} else{				
				$.ajax({
					url :`${url}/registerUser`,
					type :'POST',
					dataType : 'json',
					data : {
						username : newUserName,
						email : newEmail,
						password : passwordMemory
					},
					success : function(newUserFromMongo){
						console.log(newUserFromMongo);
						$('#createProjectModal').modal('hide');
					}, 
					// success
					error : function(newUserFromMongo){
						console.log('Already an exsisting member');
					} // error
				});
				console.log(newUserName, newEmail, password);	
			}
		}
	});

	//login
	$('#loginForm').submit(function(){
		event.preventDefault();

		let username = $('#username').val();
		let password = $('#password').val();
		console.log(username, password);

		if (username == '' || password == ''){
			alert('Please enter all details');
		} else {

			$.ajax({
				url :`${url}/loginUser`,
				type :'POST',
				data:{
					username : username,
					password : password
				},

				success : function(user){

			    console.log(user);

				if (user == 'User is not found. Please register'){
				alert('user not found. Please enter correct data or register a new user');
			    } else if (user == 'not authorized'){
					alert('Please try with correct details');
					$('#username').val('');
					$('#password').val('');
			    } else{
			    	$('#loginUserModal').modal('hide');
					sessionStorage.setItem('userID', user['user_id']);
					sessionStorage.setItem('userName',user['username']);
					sessionStorage.setItem('userEmail',user['email']);
					console.log(sessionStorage);
			    }
				checkLoginStatus();
				logoutBtnClick();
			  },//success
			  error:function(){
				console.log('error: cannot call api');
			  }// error
			});// ajax
		}// else
	});// submit function for login loginForm

	// Add a project
	$('#registerProjectForm').submit(function(){
		event.preventDefault();
		console.log('submit');

 		projectNameMemory = $('#newProjectName').val();
		projectBriefMemory = $('#projectBrief').val();
		projectImageMemory = $('#projectPicture').val();
		projectLinkMemory = $('#projectExternalLink').val();
		userIdMemory = sessionStorage.getItem('userId');

		if((projectNameMemory !== '') && (projectBriefMemory !== '') && (projectImageMemory !== '') && (projectLinkMemory !== '')){

			console.log('testing');

			$.ajax({
				url : `${url}/registerProject`,
				type : 'POST',
				data : {
					projectName : projectNameMemory ,
					projectBrief : projectBriefMemory ,
					projectImage : projectImageMemory ,
					projectLink : projectLinkMemory ,
					user_id : userIdMemory
				},
				success : function(data){
					console.log(data);
				},
				error : function(){
					console.log('error: ');
				}
			});
		} else{
			alert('Please fill in all fields');
		}
	});

	function clickNavigate(){
		// View Project Cards
		// Needs - BtnClick id | if parameter | author name info for card | Btn link for View More card btn
		$('.nav-user').click(function(){
		//
			document.getElementById('printOut').innerHTML = '';
			document.getElementById('welcomePage').innerHTML = '';
			let projectUserId = this.id;

			$.ajax({
				url : `${url}/viewProjects`,
				type : 'GET',
				dataType : 'json',
				success : function(projects) {
					console.log(projectUserId);
					
					// Displays all project cards
					for (let i = 0; i < projects.length; i++) {
						if(projects[i].user_id === projectUserId){
									// <img src="${projects[i].projectImage}" class="card-img-top" alt="Project Image">
							document.getElementById('printOut').innerHTML +=
							`<div class=col-6>
								<div class="card">
							
									<div class="card-body">
										<h5 class="card-title">${projects[i].projectName}</h5>
										<p class="card-text">${projects[i].projectBrief}</p>
										<button id="${projects[i].project_id}" class="btn btn-block btn-primary project-view-more">View More</button>
									</div>
									<div id="${projects[i].project_id}cardFooter" class="card-footer">
							
									</div>
								</div>
							</div>`;

							// Conditional statement that adds 
							if(sessionStorage.getItem('userID') === projectUserId){
								console.log('nah ah');
								var footerId = projects[i].project_id + 'cardFooter';
								console.log(footerId);
								let loggedUser = sessionStorage.getItem('userId');
									document.getElementById(footerId).innerHTML =
									`<div class="row">
										<div class="col-6">
											<button id="${projects[i].project_id}" class="btn btn-block btn-primary project-update">Update</button>
										</div>
										<div class="col-6">
											<button id="${projects[i].project_id}" class="btn btn-block btn-danger project-delete">Delete</button>
										</div>
									</div>`;
							} else{
								console.log('hmmm');
							}
						}
						else{
							console.log('Double check');
						}
					}
					deleteProjectBtnClick();
					updateProjectBtnClick();
					viewProject();
				}, //success
				error:function(){
					console.log('Error: Cannot call API');
				}
			});
		});
	}

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

	// Update a project  (yet to work on)
	function updateProjectBtnClick(){
	 	let projectToModify = this.id;
	 	$('#updateProjectForm').submit( function(){
	 		if(this.id === projectToModify){
	 			$.ajax({
	 				url : `${url}/deleteProject/${projectToDeleteId}`,
	 				type : 'PATCH',
	 				dataType : 'json',
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
