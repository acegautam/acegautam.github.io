$(document).ready(function() {
	console.log("Ready");
	checkCookie();
});

function login(){
	var username = document.getElementById('inputUsername').value;
	var password = document.getElementById('inputPassword').value;
	var resultDiv = document.getElementById("result");

	if(username !== '' && password !== ''){
		var xmlhttp;
		if (window.XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
		 	xmlhttp = new XMLHttpRequest();
		}

		else{
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			    //document.getElementById("result").innerHTML=xmlhttp.responseText;
			    var users = JSON.parse(xmlhttp.response);
			    console.log('users', users);
			    $.each(users, function(index, value) {
			    	console.log("inside each");
				    if(value.username == username && value.password == password){
				    	//resultDiv.innerHTML = "You are successfully signed in";
				    	document.cookie="username="+ value.username;
				    	window.location = 'dashboard.html';
				    	return false;
				    }
				    else{
				    	console.log('else');
				    	resultDiv.innerHTML = "Wrong username or password";
				    }
				});
			}
		};
		xmlhttp.open("GET","users.json",true);
		xmlhttp.send();
	}
	else{
		resultDiv.innerHTML = "Both the fields are required.";
	}
}

function logout(){
	var signoutConfirm = confirm('Are you sure you want to signout?');
	if(signoutConfirm){
		window.location = 'login.html';
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username"),
    	pageName = getPageName();

    if(pageName === 'login.html'){
    	return;
    }
    if (user !== "") {
        window.location = 'dashboard.html';
    } else {
        window.location = 'login.html';
    }
}

function getPageName() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page;
}