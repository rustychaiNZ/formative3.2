console.log(`Formative 3.2`);
let url;

// User (register & login) form variables
let newUserName = '';
let newEmail = '';
let passwordMemory = '';
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

// Document ready function starts
$(document).ready(function(){

	sessionStorage.clear();

	// create project button created dynamically
	function checkLoginStatus(){
		if(sessionStorage.getItem('userID')){
			// add register project button
			document.getElementById('addProjectBtnContainer').innerHTML =
			`<button id="addProjectBtn" class="btn btn-lg btn-primary btn-block" data-toggle="modal" data-target="#createProjectModal">Add Project</button>`;
			// add logout button
			document.getElementById('logoutUserBtnContainer').innerHTML = 
			`<button id="logoutBtn" class="btn btn-danger btn-block">Logout</button>`;
		} else{
			console.log('no user logged in');
		}
	}

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
			  }, // success
			  error : function(){
				console.log('error: cannot call api');
			  } // error
			}); // ajax
		} // else
	}); // submit function for login loginForm
  	
  	// Logout function called inside of login form submission
  	function logoutBtnClick(){
  		$('#logoutBtn').on('click', function(){
  			sessionStorage.clear();
  			// Removes privledges from page
  			document.getElementById('addProjectBtnContainer').innerHTML = '';
  			document.getElementById('logoutUserBtnContainer').innerHTML = '';
  		});//submit function for registerForm
  	}
	
	// Gets user's from data base for navigation
	function createUserNav(){
		$.ajax({
			url : `${url}/viewUsers`,
			type : 'GET',
			dataType : 'json',
			success : function(users){
				// Displays all of the user in the data base as navigation
				for(var i = 0; i < users.length; i++){
					document.getElementById('navContainer').innerHTML += 
					`<button id="${users[i].user_id}" type="button" data-toggle="list" class="list-group-item list-group-item-action nav-user">${users[i].username}</button>`;
				}
				clickNavigate();
			}, 
			// success end
			error:function(){
				console.log('error: cannot call api');
			} // error
		}); // ajax
		// viewUser button
	}
	createUserNav();

	// Add a product
	$('#registerProjectForm').submit(function(){
		event.preventDefault();
		console.log('submit');

 		projectNameMemory = $('#newProjectName').val();
		projectBriefMemory = $('#projectBrief').val();
		projectImageMemory = $('#projectPicture').val();
		projectLinkMemory = $('#projectExternalLink').val();
		userIdMemory = sessionStorage.getItem('userID');

		// Checks to see that all of the fields have been filled out for registering a new project
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
					$('#createProjectModal').modal('hide');
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

	// View project Modal
	function viewProject(){

		$('.project-view-more').click(function(){
			
			console.log('View Project Modal');
		});

	}

	// Delete a prject function
	function deleteProjectBtnClick(){
		$('.delete-project').on('click', function(){

			let projectToDeleteId = this.id;

			if(projectToDeleteId){
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