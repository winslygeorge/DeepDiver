<?php
$data = [];
if($_GET['index']){

    if($_GET['index'] != "undefined"){
    $websearchContent = $_GET['index'];

 

    $url = "https://bingwinsgsearch.cognitiveservices.azure.com/bing/v7.0/search";

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_URL, $url."?q=".urlencode($websearchContent));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
   
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(

        'Ocp-Apim-Subscription-Key : 181040863e064c118719500db8858148'
       
    ));

    $results = curl_exec($ch);

    if(curl_errno($ch)){

        echo "error: ".curl_error($ch);
    }else{

    $re = '/\"snippet": "(.*?)}/m';
$str = $results;
preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);

if(is_array($matches)){
    $m = 0;
    
    
    
    $myArray = [];
    
    foreach($matches as $key){
    
        $m = $m+1;
        
        array_push($myArray, $matches[$m-1][1]);
    }
   
    curl_close($ch); 
}

?>

<?php
echo $myArray[1];
?>


<?php
}}else{
        echo "No search Done";
    }}
?>
