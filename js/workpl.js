
// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
// Prefer camera resolution nearest to 1280x720.
var constraints = {video: { width: 1280, height: 720 } }; 

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 320, 480);
});


//creating a blob image from webcam snapshot 

var blob;

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

var formDataToUpload = new FormData();
var loadFile = function(event) {
	var image = document.getElementById('output');


if(image.getAttribute("class") == "hideImg"){

image.setAttribute("class", "disImg");

}else{

image.setAttribute("class", "hideImg");
}
	image.src = URL.createObjectURL(event.target.files[0]);
};

var fdat;

function captureAnalyze(){
Webcam.set({
width: 240,
height: 320,
image_format: 'png',
jpeg_quality: 90
});
Webcam.attach( '#my_camera' );



}

function take_snapshot() {

// take snapshot and get image data
Webcam.snap( function(data_uri) {
// display results in page
document.getElementById('results').innerHTML = 
'<img src="'+data_uri+'"/>';

fdat = data_uri;

//conver fdat ro a form data

console.log(fdat);
var ImageURL = fdat;
var block = ImageURL.split(";");
// Get the content type of the image
var contentType = block[0].split(":")[1];// In this case "image/gif"
// get the real base64 content of the file
var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// Convert it to a blob to upload
blob = b64toBlob(realData, contentType);

// Create a FormData and append the file with "image" as parameter name
//end of conversion

sendRequest(blob, "181040863e064c118719500db8858148");

} );
}




var counts = {};
var keys = [];
var jsonTextSearch;

var dataText;
 function handleQuery(){

    
        var subscriptionKey = "181040863e064c118719500db8858148";
    
        // Make sure user provided a subscription key and image.
        // For this demo, the user provides the key but typically you'd
        // get it from secured storage.
        if (subscriptionKey.length !== 32) {
            alert("Subscription key length is not valid. Enter a valid key.");
            
        }
    
        var imagePath = document.getElementById('uploadimage').value;
    
        if (imagePath.length === 0)
        {
            alert("Please select an image to upload.");
          
        }
    
        var responseDiv = document.getElementById('output');
    
        // Clear out the response from the last query.
        while (responseDiv.childElementCount > 0) {
            responseDiv.removeChild(responseDiv.lastChild);
        }
    
        // Send the request to Bing to get insights about the image.
        var f = document.getElementById('uploadimage').files[0];

    



        if(f != null || f != undefined || f != "undefined"){

            sendRequest(f, subscriptionKey);
        }else{

            alert("another method is choosen or no file is choosen");
        }
       


    

}

function sendRequest(file, key) {
  
    var baseUri = `https://bingwinsgsearch.cognitiveservices.azure.com/bing/v7.0/images/visualsearch?mkt=en-US&safesearch=off`;

    var formd = new FormData();
    formd.append("image", file);

 

    var request = new XMLHttpRequest();

    request.open("POST", baseUri);
    request.setRequestHeader('Ocp-Apim-Subscription-Key', key);
    request.addEventListener('load', handleResponse);
    request.send(formd);
}

function handleResponse() {
    if(this.status !== 200){
        alert("Error calling Bing Visual Search. See console log for details.");
        console.log(this.responseText);

     
        
        return;
    }else{


        jsonData = JSON.parse(this.responseText);
var nameData = "";
for(var x = 0; x < jsonData.tags.length; x++){

    let tag = jsonData.tags[x];



     var dataName = dataName + " " + jsonData.tags[x].displayName;


for(var g = 0; g < tag.actions.length; g++){

        let action = tag.actions[g];

        if(action["actionType"] == "VisualSearch"){

            let dataValue = action.data['value'];

            for(var r = 0; r < dataValue.length; r++){
                document.querySelector("#responseSection").innerHTML += "<div class ="+"gallery-single fix"+"><img  src = "+dataValue[r]['thumbnailUrl']+"></div>";

       if(r >= 6 ){

        break;
       }
            }
        }


        

        
     }



}

console.log(JSON.stringify(dataName));


var arrName = dataName.split(/\s/);

console.log(arrName);
for(var w = 0; w < arrName.length; w++){

var token = arrName[w];

if(counts[token] === undefined){

counts[token] = 1;

keys.push(token);

}else{

    counts[token] = counts[token] + 1;


}


}

var max = 0;

var keyWord = null;

for(var b = 0; b < keys.length; b++){

    var key = keys[b];

 

if(counts[key] > max ){

    max = counts[key];


keyWord = key;


  } 
    
}

}


if(keyWord === "undefined" ||keyWord === undefined|| keyWord == null|| keyWord === "" || keyWord === false){

 if(keys.length > 2){

    keyWord = keys[2]+" "+keys[3];
console.log(keyWord);

 }else{

    alert("could not determine the name of the choosen Entity");
 }
}else{

    keyWord = keys[3] +" "+ keyWord;
    console.log(keyWord);

}

document.getElementById("namtag").innerHTML = "<h3>"+keyWord +"</h3>";

   var htt =  new XMLHttpRequest();

   htt.onreadystatechange = function(){

      if(htt.readyState == 4 && htt.status == 200){

//jsonTextSearch = JSON.parse(this.responseText);
//console.log(jsonTextSearch);
console.log(this.responseText);

document.getElementById("dang").innerHTML = "<h3>"+this.responseText+"</h3>";
      }
   }

   htt.open( "GET","js/websearch.php?index="+keyWord, true);
   htt.send()

   var ph = new XMLHttpRequest();

ph.onreadystatechange = function(){

    if(ph.readyState == 4 && ph.status == 200){

        document.getElementById("desc").innerHTML = "<h3>"+this.responseText+"</h3>";

        console.log(this.responseText);

    }
}
ph.open("GET", "js/websearch2.php?index="+keyWord, true);
ph.send();
}







