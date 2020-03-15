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







	//view users
	    $('#viewUserBtn').click(function(){
				$.ajax({
	 				url : `${url}/registerProject`,
	 				type : 'POST',
	 				data : {
	 					projectName : projectName ,
	 					projectBrief : projectBrief ,
	 					projectImage : projectImage ,
	 					projectLink : projectLink ,
	 					user_id : userId

	        },//success
	        error:function(){
	          console.log('error: cannot call api');
	        }//error
	      });//ajax
	    });//viewUser button









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

});
// Document ready function ends
