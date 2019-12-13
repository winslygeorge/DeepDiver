function sendMessage(){

var xht = new XMLHTTPrequest();

xht.onreadystatechange = function(){

if(xht.readyState == 4 && xht.status == 200){

alert("message sent successfully");

}
}

var param = []

xht.open("POST", "contact", true);
xht.setRequestHeader("Content-type", "application/json");
xht.send(param);
xht.onerror = function(){
alert("The meassage was not sent successfully");
}


}
