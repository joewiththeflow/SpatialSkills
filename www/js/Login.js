//basic functions to simulate login and logout

function login(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    
    localStorage.setItem('user', username.value);
    
    //set all elements with specific class to "Hello " + username
    var helloMessages = document.getElementsByClassName("hello");
    for (var i = 0; i < helloMessages.length; i++){
        helloMessages[i].innerHTML = "Hello " + localStorage.getItem('user') + "!";
    }
    
    username.value = "";
    password.value = "";
    //window.location.href ="#home";
    $.mobile.pageContainer.pagecontainer("change", "#home", {transition:"none"});
    
}

function logout(){
    var helloMessages = document.getElementsByClassName("hello");
    for (var i = 0; i < helloMessages.length; i++){
        helloMessages[i].innerHTML = "";
    }
    localStorage.removeItem('user');
    //window.location.href = "#login";
    $.mobile.pageContainer.pagecontainer("change", "#login", {transition:"none"});
}
