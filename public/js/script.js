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
