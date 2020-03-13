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

// Document ready function starts
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

	// View Project Cards
	// Needs - BtnClick id | if parameter | author name info for card | Btn link for View More card btn 

	$('#  ').click(function(){
    //
    
		if (  === projectUserId) {
			$.ajax({
				url : `${url}/viewProjects`,
				type : 'GET',
				dataType : 'json',
				success : function(projectsFromMongo) {
					console.log(projectsFromMongo);

					document.getElementById('projectCards').innerHTML = "";
					for (let i = 0; i < projectsFromMongo.length; i++) {
						document.getElementById('projectCards').innerHTML +=
						`<div class="card" style="width: 18rem;">
							  <img src="${projectsFromMongo[i].projectImage}" class="card-img-top" alt="Project Image">

								<div class="card-body">
									<h5 class="card-title">${projectsFromMongo[i].projectName}</h5>
									<p class="card-text">${   }</p>
									<a href="#           " class="btn btn-primary">View More</a>
							  </div>
								<div id="cardFooter" class="card-footer text-muted">

							  </div>
						 </div>`;
					}
				}, //success
				error:function(){
					console.log('Error: Cannot call API');
				}
			});
		}
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
