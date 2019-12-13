function sendMessage(){

var xht = new XMLHttpRequest();

xht.onreadystatechange = function(){

if(xht.readyState == 4 && xht.status == 200){

alert("message sent successfully"+ this.responseText);

}
}
 var name = document.getElementById("name").value;
      var email =  document.getElementById("email").value;
      var phone =  document.getElementById("phone").value;
      var message =  document.getElementById("message").value;
var param = "?name="+name+"&email="+email+"&phone="+phone+"&message="+message;

xht.open("GET", "../mail/contact_me.php"+param, true);
xht.send();
xht.onerror = function(){
alert("The meassage was not sent successfully");
}


}
