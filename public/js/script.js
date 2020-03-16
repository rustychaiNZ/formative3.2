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


console.log(sessionStorage);

// Document ready function starts
$(document).ready(function(){

	sessionStorage.clear();

	// create project button created dynamically
	function checkLoginStatus(){
		if(sessionStorage['userID']){
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

	//Register User
	// $('#registerUserForm').submit(function(){
// 
		// event.preventDefault();
	// 
		// newUserName = document.getElementById('newUserName').value;
		// newEmail = document.getElementById('newEmail').value;
		// newPassword = document.getElementById('newPassword').value;
		// confirmPassword = document.getElementById('confirmPassword').value;
// 
		// Validates to make sure that the user has entered the right password
		// if(newPassword !== confirmPassword){
			// alert('Please Make sure passwords match');
		// } else{
// 
			// passwordMemory = confirmPassword;
// 
			// Conditional statement that ensures that the user has filled out all of the fields.
			// if((newUserName !== '') && (newEmail !== '') && (passwordMemory !== '')){
			// 
				// $.ajax({
					// url :`${url}/registerUser`,
					// type :'POST',
					// dataType : 'json',
					// data : {
						// username : newUserName,
						// email : newEmail,
						// password : passwordMemory
					// },
					// success : function(newUserFromMongo){
						// console.log(newUserFromMongo);
						// if (newUserFromMongo !== 'username taken already. Please try another one') {
							// alert('You are registered');
							// $('#loginUserModal').show();
							// $('#registerNewUserModal').hide();
							// $('#loginUserBtn').show();
							// $('#registerNewUserBtn').hide();
							// $('#registerUserForm').hide();
							// clearFields();
						 // } else {
							// alert('Congrats');
							// $('#newUserName').val('');
							// $('#newEmail').val('');
							// $('#newPassword').val('');
						// }
					// }, //success
					// error : function(newUserFromMongo){
						// console.log('Already an exsisting member');
					// }//error
				// });	
				// console.log('testing');
// 
			// } else {
				// alert('Please enter all details');
			// }
		// } // confirm password conditional statement
		// console.log(newUserName,newEmail, newPassword);
	// });

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
					}, // success
					error : function(newUserFromMongo){
						console.log('Already an exsisting member');
					} // error
				});
				console.log(newUserName, newEmail, password);	
			}
		}
	});

	//login
	$('#loginBtn').click(function(){
		$('#loginForm').show();
	});
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
					sessionStorage.setItem('userID', user['_id']);
					sessionStorage.setItem('userName',user['username']);
					sessionStorage.setItem('userEmail',user['email']);
					console.log(sessionStorage);
			    }
				checkLoginStatus();
				logoutBtnClick();
			  },//success
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
	// Displays all of the users as navigation menu
	// $.ajax({
		// url : `${url}/viewUsers`,
		// type : 'GET',
		// dataType : 'json',
		// success : function(usersFromMongo){
			// console.log(usersFromMongo);
			// for(var i = 0; i < usersFromMongo.length; i++){
				// document.getElementById('').innerHTML +=
			// }
		// },
		// error : function(){
			// console.log('error: cannot call api');
		// }
	// });





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

	// Create card buttons for delete and modify
	function createEditBtns(){

		let loggedUser = sessionStorage.getItem('userId');
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

	// Gives user feedback based on which nav item is selected
	function highlightSelectedUser(){
		// When nav item is clicked, changes highlighted to selected user
		$('.list-group-item').on('click', function(){
			console.log('test');
			$('.list-group-item').removeClass('active');
			// Loops through db to find matching user id
			for(var i = 0; i < projectsFromMongo[i].length; i++){
				if(this.id === projectsFromMongo[i].user_id){
					$(this.id).addClass('active');
				}
			} 
		});
	}

	function clickNavigate(){
		// View Project Cards
		// Needs - BtnClick id | if parameter | author name info for card | Btn link for View More card btn
		$('.nav-user').click(function(){
		//
			let projectUserId = this.id;
			$.ajax({
				url : `${url}/viewProjects`,
				type : 'GET',
				dataType : 'json',
				success : function(projects) {
					console.log(projectUserId);
					
					// Displays all project cards
					for (let i = 0; i < projects.length; i++) {
						console.log(projects[i].user_id);
						if(projects[i].user_id == projectUserId){
							document.getElementById('printOut').innerHTML +=
							`<div class=col-6>
								<div class="card">
									<img src="${projects[i].projectImage}" class="card-img-top" alt="Project Image">
							
									<div class="card-body">
										<h5 class="card-title">${projects[i].projectName}</h5>
										<p class="card-text">${projects[i].projectBrief}</p>
										<a id="${projects[i].project_id}" href="#" class="btn btn-primary">View More</a>
									</div>
									<div id="cardFooter" class="card-footer text-muted">
							
									</div>
								</div>
							</div>`;
							createEditBtns();
							console.log('hello world');
						}
						else{
							console.log('Double check');
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