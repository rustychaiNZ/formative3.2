console.log(`Formative 3.2`);

// User (register & login) form variables
let username = '';
let email = '';
let password = '';
let enteredPassowrd = '';
let confirmedPassword = '';
let url;

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

//Register User

$('#registerUserForm').submit(function(){

    event.preventDefault();

    let newUserName = $('#r-newUserName').val();
    let newEmail = $('#newEmail').val();
    let newPassword = $('#newPassword').val();
		let confirmPassword = $('#confirmPassword').val();

    console.log(newUserName,newEmail, newPassword);
    if (newUserName == '' || newEmail == '' || newPassword == ''){
      alert('Please enter all details');
    } else {

    $.ajax({
      url :`${url}/registerUser`,
      type :'POST',
      data:{
        username : newUserName,
        email : newEmail,
        password : newPassword
        },

      success : function(user){
        console.log(user);
        if (!(user == 'username taken already. Please try another one')) {
        alert('Please login to manipulate the products data');
          $('#loginUserBtn').show();
          $('#registerNewUserBtn').hide();
          $('#registerUserForm').hide();
        } else {
          alert('username taken already, Please try another one');
          $('#newUserName').val('');
          $('#newEmail').val('');
          $('#newPassword').val('');
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//ajax

  }//else
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
