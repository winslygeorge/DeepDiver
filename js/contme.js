function sendMessage(){

var xht = new XMLHTTPrequest();

xht.onreadystatechange = function(){

if(xht.readyState == 4 && xht.status == 200){

alert("message sent successfully");

}
}
 var name = document.getElementById("name").value();
      var email =  document.getElementById("email").value();
      var phone =  document.getElementById("phone").value();
      var message =  document.getElementById("message").value();
var param = {
  
  name: name,
  email: email,
  phone: phone,
  message: message
  
}

xht.open("POST", "../mail.mail.php", true);
xht.setRequestHeader("Content-type", "application/json");
xht.send(param);
xht.onerror = function(){
alert("The meassage was not sent successfully");
}


}
