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

// Document ready fucntion starts
$(document).ready(function(){

	// Hides appropriate sections on boot of page
	// $('#addProjectBtn').hide();

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
 					user_id : userId
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

});
// Document ready function ends
